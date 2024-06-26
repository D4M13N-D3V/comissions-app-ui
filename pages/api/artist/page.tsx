import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function pageSettings(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  if(req.method !== 'GET') {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/Artist/Page', {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(req.body)
      });
      let result = await response.json();
      res.status(200).json(result);
  }
  else{
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/Artist/Page', {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    
    //console.log(response)
    let result = await response.json();
    res.status(200).json(result);
  }
});

