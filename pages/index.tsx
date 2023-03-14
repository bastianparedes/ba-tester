import React from 'react';

import { gql, useQuery } from '@apollo/client';
import type { GetServerSideProps } from 'next';

import CampaignsContainer from '../components/index/CampaignsContainer';
import Header from '../components/index/Header';
import type { campaignWithStatus } from '../types/databaseObjects';
import { getCampaignsStatus } from '../utils/database';

const AllQueryStatus = gql`
  query Status($idStatus: Int) {
    status(idStatus: $idStatus) {
      idStatus
      value
    }
  }
`;

const Index = ({
  campaigns
}: {
  campaigns: campaignWithStatus[];
}): JSX.Element => {
  const { data, error, loading } = useQuery(AllQueryStatus, {
    variables: {
      idStatus: 2
    }
  });

  React.useEffect(() => {
    console.log({ data });
  }, [data]);

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
