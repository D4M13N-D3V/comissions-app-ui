import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => `/api/admin/AdminArtists/${req.query.artistId}/Terminate`,
  method: 'PUT',
});
