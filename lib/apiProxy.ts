import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ProxyConfig = {
  /**
   * Path on the core API. Either a static string or a builder that derives it
   * from the request (use the builder form for dynamic `[param]` routes).
   */
  path: string | ((req: NextApiRequest) => string);
  /**
   * HTTP method sent to the core API. Pinned server-side so the client cannot
   * choose the upstream verb. Defaults to the incoming request method.
   */
  method?: string;
  /**
   * Incoming HTTP methods this route accepts. Anything else gets a 405.
   * Defaults to `[method]` (or the incoming method when `method` is omitted).
   */
  allowedMethods?: string[];
  /** Forward the (JSON) request body to the core API. Default: false. */
  forwardBody?: boolean;
  /**
   * Attach the Auth0 access token and require an authenticated session.
   * Default: true. Set to false for public endpoints (e.g. discovery).
   */
  auth?: boolean;
};

async function forward(req: NextApiRequest, res: NextApiResponse, config: ProxyConfig): Promise<void> {
  if (!API_URL) {
    res.status(500).json({ error: 'NEXT_PUBLIC_API_URL is not configured' });
    return;
  }

  const method = (config.method ?? req.method ?? 'GET').toUpperCase();
  const allowed = (config.allowedMethods ?? [method]).map(m => m.toUpperCase());
  if (req.method && !allowed.includes(req.method.toUpperCase())) {
    res.setHeader('Allow', allowed.join(', '));
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const headers: Record<string, string> = {};

  if (config.auth !== false) {
    const { accessToken } = await getAccessToken(req, res);
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let body: string | undefined;
  if (config.forwardBody && req.body != null && req.body !== '') {
    headers['Content-Type'] = 'application/json';
    body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  const path = typeof config.path === 'function' ? config.path(req) : config.path;

  let upstream: Response;
  try {
    upstream = await fetch(`${API_URL}${path}`, { method, headers, body });
  } catch (error) {
    console.error('Proxy request to core API failed:', error);
    res.status(502).json({ error: 'Upstream request failed' });
    return;
  }

  // Faithfully propagate the upstream status instead of masking failures as 200.
  res.status(upstream.status);
  const text = await upstream.text();
  if (!text) {
    res.end();
    return;
  }
  const contentType = upstream.headers.get('content-type');
  if (contentType) {
    res.setHeader('Content-Type', contentType);
  }
  res.send(text);
}

/**
 * Build a Next.js API route that proxies to the core API, attaching the Auth0
 * access token. Centralizes auth, method pinning, body forwarding and faithful
 * status-code propagation so individual routes stay one-liners.
 */
export function createApiProxy(config: ProxyConfig) {
  const handler = (req: NextApiRequest, res: NextApiResponse) => forward(req, res, config);
  return config.auth === false ? handler : withApiAuthRequired(handler);
}
