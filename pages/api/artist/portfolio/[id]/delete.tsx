import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { IncomingForm } from 'formidable'
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};
async function createBlobFromFile(path: string): Promise<Blob> {
    const file = await fs.readFile(path);
    return new Blob([file]);
}

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { id } = req.query;

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/SellerProfile/Portfolio/'+id, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
  });
  res.status(200).json({status: await response.json()});
});
