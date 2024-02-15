export default async function handler(req, res  ): Promise<any>  {
    const { sellerId } = req.query;
    var url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Sellers/${sellerId}/Portfolio`;
    //console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch seller portfolio');
    }
    var result = await response.json();
    //console.log(result)
    res.status(200).json(result);
}

