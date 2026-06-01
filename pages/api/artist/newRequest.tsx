import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create an artist-access request.
//
// The core API endpoint is `POST /api/ArtistAccessRequest` and binds the body as
// `[FromBody] string message`, i.e. it expects a JSON-encoded *string* (e.g. `"hi"`).
// We re-encode whatever the client sent (a string, or `{ message }`) so the upstream
// model binding succeeds. Written as a dedicated handler rather than createApiProxy
// because the shared proxy passes string bodies through verbatim, which would send an
// unquoted value the core API can't parse.
export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    res.status(500).json({ error: 'NEXT_PUBLIC_API_URL is not configured' });
    return;
  }

  const message =
    typeof req.body === 'string' ? req.body : (req.body?.message ?? '');

  const { accessToken } = await getAccessToken(req, res);

  let upstream: Response;
  try {
    upstream = await fetch(`${apiUrl}/api/ArtistAccessRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Artist access request proxy failed:', error);
    res.status(502).json({ error: 'Upstream request failed' });
    return;
  }

  res.status(upstream.status);
  const text = await upstream.text();
  if (!text) {
    res.json({});
    return;
  }
  const contentType = upstream.headers.get('content-type');
  if (contentType) res.setHeader('Content-Type', contentType);
  res.send(text);
});
