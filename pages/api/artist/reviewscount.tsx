import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: '/api/Artist/Reviews/Count',
  method: 'GET',
  allowedMethods: ['POST', 'GET'],
});
