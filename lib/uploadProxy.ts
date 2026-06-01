import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import type { File as FormidableFile } from 'formidable';
import fs from 'fs/promises';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Maximum accepted upload size (bytes). */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
/** Accepted image content types. */
export const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

export type UploadProxyConfig = {
  /** Core API path to POST the file to. */
  path: string | ((req: NextApiRequest) => string);
  /** multipart form field name carrying the file. Default: 'newImage'. */
  field?: string;
};

/** Routes using this must disable Next's body parser. */
export const uploadApiConfig = {
  api: {
    bodyParser: false,
  },
};

/**
 * Build a Next.js API route that accepts a single image upload, validates its
 * size/type, and forwards the raw bytes to the core API as octet-stream.
 * Enforces auth, cleans up the temp file, and propagates the upstream status.
 */
export function createUploadProxy(config: UploadProxyConfig) {
  return withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!API_URL) {
      res.status(500).json({ error: 'NEXT_PUBLIC_API_URL is not configured' });
      return;
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const field = config.field ?? 'newImage';
    const form = new IncomingForm({
      maxFiles: 1,
      maxFileSize: MAX_UPLOAD_BYTES,
      keepExtensions: true,
    });

    let file: FormidableFile | undefined;
    try {
      const [, files] = await form.parse(req);
      const uploaded = files[field];
      file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
    } catch (error) {
      // Thrown on maxFileSize / maxFiles violations or malformed multipart data.
      console.error('Upload parse failed:', error);
      res.status(400).json({ error: 'Invalid or too-large upload' });
      return;
    }

    if (!file) {
      res.status(400).json({ error: `Missing file field "${field}"` });
      return;
    }

    if (file.mimetype && !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      await fs.unlink(file.filepath).catch(() => undefined);
      res.status(415).json({ error: 'Unsupported file type' });
      return;
    }

    const { accessToken } = await getAccessToken(req, res);
    const path = typeof config.path === 'function' ? config.path(req) : config.path;

    try {
      const data = await fs.readFile(file.filepath);
      const upstream = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream',
        },
        body: data,
      });

      res.status(upstream.status);
      const text = await upstream.text();
      if (!text) {
        res.json({});
        return;
      }
      const contentType = upstream.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      res.send(text);
    } catch (error) {
      console.error('Upload forwarding failed:', error);
      res.status(502).json({ error: 'Upload failed' });
    } finally {
      await fs.unlink(file.filepath).catch(() => undefined);
    }
  });
}
