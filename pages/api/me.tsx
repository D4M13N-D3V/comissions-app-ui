import { createApiProxy } from '@/lib/apiProxy';

// GET = current user, PUT = update current user.
export default createApiProxy({
  path: '/api/User',
  allowedMethods: ['GET', 'PUT'],
  forwardBody: true,
});
