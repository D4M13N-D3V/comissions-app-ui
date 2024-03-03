import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { offset, pageSize } = req.body;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/admin/AdminArtists?offset='+offset+'&pageSize='+pageSize, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if(response.ok==false){
    res.status(200).json({})
    return;
  }
  let result = await response.json();
  res.status(200).json(result);
});

