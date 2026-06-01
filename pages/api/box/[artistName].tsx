import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/Discovery/Artists/${req.query.artistName}/Page`,
  method: 'GET',
  auth: false,
});
