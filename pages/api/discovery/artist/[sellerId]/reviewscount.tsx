import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/Discovery/Artists/${req.query.sellerId}/Reviews/Count`,
  method: 'GET',
  auth: false,
});
