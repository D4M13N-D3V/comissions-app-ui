import { createApiProxy } from '@/lib/apiProxy';

// Probes an admin-only core API endpoint; the caller checks the status code.
export default createApiProxy({
  path: '/api/admin/AdminArtistRequests',
  method: 'GET',
});
