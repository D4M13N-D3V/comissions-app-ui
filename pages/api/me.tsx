import { useRouter } from 'next/router'
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getAccessToken } from '@auth0/nextjs-auth0';


export default withApiAuthRequired(async function handler(req, res) {
    if(req.method !== 'GET') {
        ////console.log(req.body)
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/User', {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: req.body
        });
        
        let result = await response.json();
        res.status(200).json(result);
    }
    else{
        const { accessToken } = await getAccessToken(req, res);
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/User', {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        
        let result = await response.json();
        res.status(200).json(result);
    }
  });