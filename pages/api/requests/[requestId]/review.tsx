import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/Requests/Customer/${req.query.requestId}/Review`,
  method: 'PUT',
  allowedMethods: ['PUT'],
  forwardBody: true,
});
