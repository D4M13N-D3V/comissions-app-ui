import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const url = process.env.NEXT_PUBLIC_API_URL + `/api/Requests/Request`;
    const { accessToken } = await getAccessToken(req, res);

    try {
        const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body,
        });

        res.status(response.status);
        const text = await response.text();
        if (!text) {
            res.json({});
            return;
        }
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }
        res.send(text);
    } catch (error) {
        console.error('Error occurred during fetch:', error);
        res.status(502).json({ error: 'An error occurred during the request' });
    }
});
