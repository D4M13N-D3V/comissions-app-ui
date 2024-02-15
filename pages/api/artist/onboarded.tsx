import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function onboardUrl(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/SellerProfile/Onboard', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  
  let result = await response.json();
  res.status(200).json(result);
});

