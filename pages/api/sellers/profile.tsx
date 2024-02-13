import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res);
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/SellerProfile', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if(response.status == 401 || response.status == 400){
    res.status(200);
  }
  else{
    let result = await response.json();
    res.status(200).json(result);
  }
});

