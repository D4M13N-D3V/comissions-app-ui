import { getAccessToken } from '@auth0/nextjs-auth0';
import fetch from 'node-fetch'; // Import node-fetch for making HTTP requests

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const url = process.env.NEXT_PUBLIC_API_URL + `/api/Requests/Request`;
        const { accessToken } = await getAccessToken(req, res);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },   
                body: req.body, // Pipe the incoming request directly to the outgoing request
            });

            if (!response.ok) {
                const errorData = await response.json();
                res.status(response.status).json(errorData);
                return;
            }

            const result = await response.json();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error occurred during fetch:', error);
            res.status(500).json({ error: 'An error occurred during the request' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
