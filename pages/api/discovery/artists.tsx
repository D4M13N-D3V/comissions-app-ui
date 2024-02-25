export default async function handler(req, res): Promise<any>  {
    let url = process.env.NEXT_PUBLIC_API_URL+`/api/Discovery/Artists`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch sellers');
    }
    let parsedJson = await response.json();
  res.status(200).json(parsedJson);
}