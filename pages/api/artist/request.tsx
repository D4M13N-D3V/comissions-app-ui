import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  ////console.log(accessToken)
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/Artist/Request', {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    method: 'GET'
  });
  if(response.status == 404)
  {
    res.status(200).json({})
  }
  else{
    let result = await response.json();
    res.status(200).json(result);
  }
});

