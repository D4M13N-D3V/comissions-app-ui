import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const { userId } = req.query;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/admin/AdminUsers/'+userId+"/Unsuspend", {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
    method: req.method
  });
  if(response.ok==false){
    res.status(200).json({})
    return;
  }
  let result = await response.json();
  res.status(200).json(result);
});

