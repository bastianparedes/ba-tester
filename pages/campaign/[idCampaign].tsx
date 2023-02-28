import React, { useState } from 'react';

import type { GetServerSideProps } from 'next';

import Buttons from '../../components/campaign/Buttons';
import Evaluators from '../../components/campaign/Evaluators';
import Name from '../../components/campaign/Name';
import Variations from '../../components/campaign/Variations';
import constants from '../../config/constants';
import type {
  campaignWithVariationsEvaluatorsStatus,
  status
} from '../../types/databaseObjects';
import { getCampaignById, getStatus } from '../../utils/database';

const Index = ({
  initialCampaign,
  status
}: {
  initialCampaign: campaignWithVariationsEvaluatorsStatus;
  status: status[];
}): JSX.Element => {
  const [campaign, setCampaign] = useState(initialCampaign);
  return (
    <>
      <Name campaign={campaign} setCampaign={setCampaign} status={status} />
      <Variations setCampaign={setCampaign} variations={campaign.variations} />
      <Evaluators evaluators={campaign.evaluators} setCampaign={setCampaign} />
      <Buttons campaign={campaign} />
    </>
  );
};

const getServerSideProps: GetServerSideProps<{
  initialCampaign: campaignWithVariationsEvaluatorsStatus | null;
  status: status[];
}> = async (context) => {
  const campaignId = Number(context.query.idCampaign);
  const status = await getStatus();

  if (Number.isNaN(campaignId))
    return {
      props: {
        status
      },
      redirect: {
        destination:
          constants.path.campaign +
          '/' +
          String(constants.newCampaign.idCampaign),
        permanent: true
      }
    };

  if (campaignId === constants.newCampaign.idCampaign)
    return {
      props: {
        initialCampaign: constants.newCampaign,
        status
      }
    };

  const initialCampaign = await getCampaignById(
    Number(context.query.idCampaign)
  );

  if (initialCampaign === null)
    return {
      props: {
        status
      },
      redirect: {
        destination:
          constants.path.campaign +
          '/' +
          String(constants.newCampaign.idCampaign),
        permanent: true
      }
    };

  return {
    props: {
      initialCampaign,
      status
    }
  };
};

export { getServerSideProps };
export default Index;
