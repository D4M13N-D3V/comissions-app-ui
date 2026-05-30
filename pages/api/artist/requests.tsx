import { createApiProxy } from '@/lib/apiProxy';

export default createApiProxy({
  path: req => {
    const { completed, declined, accepted, paid, offset, pageSize } = req.body ?? {};
    return `/api/Requests/Artist?completed=${completed}&declined=${declined}&accepted=${accepted}&paid=${paid}&offset=${offset}&pageSize=${pageSize}`;
  },
  method: 'GET',
  allowedMethods: ['POST'],
});
