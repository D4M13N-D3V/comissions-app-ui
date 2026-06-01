import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

/**
 * Server-side guard for admin dashboard pages. Re-export as the page's
 * `getServerSideProps`:
 *
 *   export { getServerSideProps } from '../../../lib/requireAdmin';
 *
 * Requires an authenticated session (redirects to login otherwise) and then
 * verifies admin authority against the core API. Non-admins are redirected to
 * /401 instead of being served the page shell. This is defense-in-depth: the
 * core API still enforces authorization on every admin request.
 */
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    try {
      const { accessToken } = await getAccessToken(ctx.req, ctx.res);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/admin/AdminArtistRequests',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!response.ok) {
        return { redirect: { destination: '/401', permanent: false } };
      }
    } catch (error) {
      console.error('Admin guard check failed:', error);
      return { redirect: { destination: '/401', permanent: false } };
    }
    return { props: {} };
  },
});
