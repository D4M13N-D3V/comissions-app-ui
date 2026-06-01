import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: '/api/Artist',
  method: 'POST',
  allowedMethods: ['POST'],
  forwardBody: true,
});
