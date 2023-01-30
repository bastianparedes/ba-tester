import React from 'react';

import type { campaign, status } from '.prisma/client/index';
import type { GetServerSideProps } from 'next';

import CampaignsContainer from '../components/index/CampaignsContainer';
import Header from '../components/index/Header';
import { prisma } from '../lib/prisma';

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
  const campaigns = await prisma.campaign.findMany({
    include: { status: true },
    orderBy: [{ idCampaign: 'desc' }],
    where: {
      idStatus: {
        not: 2
      }
    }
  });

  return {
    props: {
      campaigns
    }
  };
};

export { getServerSideProps };
export default Index;
