import { cleanEnv, str } from 'envalid';
export default cleanEnv(process.env, {
  NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE: str(),
});
