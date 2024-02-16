import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { IncomingForm } from 'formidable'
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};
async function createBlobFromFile(path: string): Promise<Blob> {
    const file = await fs.readFile(path);
    return new Blob([file]);
}

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  
  const form = new IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }
    const file = files["newImage"]; // Assuming your file input field name is 'file'
    try {
      
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/SellerProfile/Portfolio', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": " application/octet-stream"
        },
        body: await createBlobFromFile(file[0].filepath) // Don't set Content-Type, FormData will handle it
      });
      
      (response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }

      const responseData = await response.json();
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });
});
