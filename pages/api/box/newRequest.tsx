import { useRouter } from 'next/router'
import { getAccessToken } from '@auth0/nextjs-auth0';


export default async function handler(req, res  ): Promise<any>  {
    const { artistName } = req.query;
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Requests/Request`;
    const { accessToken } = await getAccessToken(req, res);
    const response = await fetch(url,{
        method: 'POST',
        headers: {

        "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: req.body
    });
    //console.log(response)
    if (!response.ok) {
        throw new Error('Failed to fetch seller');
    }
    let result = await response.json();
    res.status(200).json(result);
}