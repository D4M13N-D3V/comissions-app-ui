import { createApiProxy } from '@/lib/apiProxy';

// NOTE: the core API does not yet expose AdminArtists/{id}/Suspend; this route
// will 404 upstream until that endpoint is implemented. Param fixed (was req.query.userId).
export default createApiProxy({
  path: req => `/api/admin/AdminArtists/${req.query.artistId}/Suspend`,
  method: 'PUT',
});
