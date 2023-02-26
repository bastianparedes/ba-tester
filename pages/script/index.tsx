import React from 'react';

import fsPromises from 'fs/promises';
import { type GetServerSideProps } from 'next';
import path from 'path';

import { getCampaignsForFrontend } from '../../utils/database';

interface props {
  script: string;
}

const scriptPage = ({ script }: props): JSX.Element => {
  return <>{script}</>;
};

const getServerSideProps: GetServerSideProps<{ script: string }> = async () => {
  const jsonData = await getCampaignsForFrontend();

  const script =
    `window.ab=${JSON.stringify(jsonData)};` +
    (await fsPromises.readFile(
      path.join(process.cwd(), 'public', 'script.js'),
      'utf-8'
    ));

  return {
    props: {
      script
    }
  };
};

export { getServerSideProps };
export default scriptPage;
