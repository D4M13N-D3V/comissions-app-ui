import { createApiProxy } from '@/lib/apiProxy';

// GET = load profile, PUT = update profile.
export default createApiProxy({
  path: '/api/Artist',
  allowedMethods: ['GET', 'PUT'],
  forwardBody: true,
});
