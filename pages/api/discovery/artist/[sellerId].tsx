import { useRouter } from 'next/router'


export default async function handler(req, res  ): Promise<any>  {
    const { sellerId } = req.query;
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Artists/${sellerId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller');
    }
    let result = await response.json();
    res.status(200).json(result);
}