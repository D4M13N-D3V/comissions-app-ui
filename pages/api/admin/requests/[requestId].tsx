import { createApiProxy } from '@/lib/apiProxy';

// GET = view details, PUT = accept, DELETE = deny. The verb is meaningful here,
// so it is forwarded (within an explicit allow-list) rather than pinned.
export default createApiProxy({
  path: req => `/api/admin/AdminArtistRequests/${req.query.requestId}`,
  allowedMethods: ['GET', 'PUT', 'DELETE'],
});
