import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/admin/AdminUsers?offset=${req.body?.offset ?? ''}&pageSize=${req.body?.pageSize ?? ''}`,
  method: 'GET',
  allowedMethods: ['POST'],
});
