import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

async function createBlobFromFile(path: string): Promise<Blob> {
  const file = await fs.readFile(path);
  return new Blob([file]);
}
export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const requestId = req.query.requestId;
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/Requests/Artist/'+requestId+'/Assets', {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: req.method
    });
    let result = await response.json();
    res.status(200).json(result);
});

