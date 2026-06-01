import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/Artist/Portfolio/${req.query.id}`,
  method: 'DELETE',
});
