import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { requestId } = req.query;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/admin/AdminArtistRequests/'+requestId, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    method: req.method
  });
  console.log(response)
  let result = await response.json();
  res.status(200).json(result);
});

// handles ACCEPT AND DENY