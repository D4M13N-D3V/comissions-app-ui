import { handleAuth } from "@auth0/nextjs-auth0";
exports.onExecutePostLogin = async (event, api) => {
    const namespace = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    //console.log(event.authorization)
  }
export default handleAuth();
