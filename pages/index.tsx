import React from 'react';

import type { campaign, status } from '.prisma/client/index';
import type { GetServerSideProps } from 'next';

import CampaignsContainer from '../components/index/CampaignsContainer';
import Header from '../components/index/Header';
import { getCampaignsStatus } from '../utils/database';

const Index = ({
  campaigns
}: {
  campaigns: Array<campaign & { status: status }>;
}): JSX.Element => {
  return (
    <>
      <Header />
      <CampaignsContainer campaigns={campaigns} />
    </>
  );
};

const getServerSideProps: GetServerSideProps<{
  campaigns: Array<campaign & { status: status }>;
}> = async () => {
  const campaigns = await getCampaignsStatus();

  return {
    props: {
      campaigns
    }
  };
};

export { getServerSideProps };
export default Index;
