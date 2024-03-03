import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/admin/AdminArtistRequests', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  res.status(response.status).json({})
});

