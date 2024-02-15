import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/SellerProfile', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    method: 'POST'
  });
  let result = await response.json();
  res.status(200).json(result);
});

