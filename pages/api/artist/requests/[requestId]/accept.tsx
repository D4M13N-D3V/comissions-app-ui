import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/Requests/Artist/${req.query.requestId}/Accept`,
  method: 'PUT',
});
