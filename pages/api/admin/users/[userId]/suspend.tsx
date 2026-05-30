import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/admin/AdminUsers/${req.query.userId}/Suspend`,
  method: 'PUT',
});
