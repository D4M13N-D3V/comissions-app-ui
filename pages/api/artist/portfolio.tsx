import { createUploadProxy, uploadApiConfig } from '../../../lib/uploadProxy';

export const config = uploadApiConfig;

export default createUploadProxy({ path: '/api/Artist/Portfolio' });
