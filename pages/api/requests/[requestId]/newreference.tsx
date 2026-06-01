import { createUploadProxy, uploadApiConfig } from '../../../../lib/uploadProxy';

export const config = uploadApiConfig;

export default createUploadProxy({
  path: req => `/api/Requests/Customer/${req.query.requestId}/References`,
});
