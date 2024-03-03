import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const requestId = req.query.requestId;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/Requests/Customer/'+requestId+'/Review', {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(req.body)
  });
  let result = await response.json();
  res.status(200).json(result);
});

