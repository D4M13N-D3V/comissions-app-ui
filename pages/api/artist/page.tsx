import { createApiProxy } from '@/lib/apiProxy';

// GET = load page settings, PUT = update them.
export default createApiProxy({
  path: '/api/Artist/Page',
  allowedMethods: ['GET', 'PUT'],
  forwardBody: true,
});
