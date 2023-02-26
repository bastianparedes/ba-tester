import React from 'react';

import type { GetServerSideProps } from 'next';

import CampaignsContainer from '../components/index/CampaignsContainer';
import Header from '../components/index/Header';
import type { campaignWithStatus } from '../types/databaseObjects';
import { getCampaignsStatus } from '../utils/database';

const Index = ({
  campaigns
}: {
  campaigns: campaignWithStatus[];
}): JSX.Element => {
  return (
    <>
      <Header />
      <CampaignsContainer campaigns={campaigns} />
    </>
  );
};

const getServerSideProps: GetServerSideProps<{
  campaigns: campaignWithStatus[];
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
