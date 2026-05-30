import { createApiProxy } from '@/lib/apiProxy';

// Client POSTs pagination in the body; forwarded to the core API as GET query params.
export default createApiProxy({
  path: req => `/api/admin/AdminArtists?offset=${req.body?.offset ?? ''}&pageSize=${req.body?.pageSize ?? ''}`,
  method: 'GET',
  allowedMethods: ['POST'],
});
