import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: '/api/Artist/Reviews',
  method: 'GET',
  allowedMethods: ['POST', 'GET'],
});
