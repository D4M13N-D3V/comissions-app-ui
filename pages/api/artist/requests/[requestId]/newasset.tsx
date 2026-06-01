import { createUploadProxy, uploadApiConfig } from '../../../../../lib/uploadProxy';

export const config = uploadApiConfig;

export default createUploadProxy({
  path: req => `/api/Requests/Artist/${req.query.requestId}/Assets`,
});
