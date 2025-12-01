import { redirect } from 'next/navigation';
import path from 'path';

import constants from '../config/constants';

const Page = () => {
  const redirectUrl = path.join(constants.pages.campaigns);
  redirect(redirectUrl);
};

export default Page;
