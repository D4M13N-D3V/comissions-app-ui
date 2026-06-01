import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({ path: '/api/admin/AdminArtistRequests/Count', method: 'GET', allowedMethods: ['POST'] });
