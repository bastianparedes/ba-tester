import { redirect } from 'next/navigation';
import constants from '@/config/constants';

const Page = () => {
  const redirectUrl = constants.pages.tenants();
  redirect(redirectUrl);
};

export default Page;
