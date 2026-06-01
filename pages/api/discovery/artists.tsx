import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({ path: '/api/Discovery/Artists', method: 'GET', auth: false });
