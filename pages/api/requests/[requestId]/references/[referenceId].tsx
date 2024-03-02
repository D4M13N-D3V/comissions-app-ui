import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default withApiAuthRequired(async function references(req, res) {
    const { accessToken } = await getAccessToken(req, res);
    const requestId = req.query.requestId;
    const referenceId = req.query.referenceId;
    const response = await axios({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/Requests/Customer/${requestId}/References/${referenceId}`,
        responseType: 'stream',
        headers: {

      "Authorization": `Bearer ${accessToken}`,
        }
      })

    res.setHeader('Content-Type', response.headers['content-type']);

    // Pipe the response stream directly to the response of the Next.js API Route
    response.data.pipe(res);
});
