import React, { useState } from 'react';

import path from 'path';

import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../../config/constants';
import { trpcClient } from '../../../../../../lib/trpc/client';
import { basePath } from '../../../../../../next.config';
import type { CampaignExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import Loader from '../../../../common/Loader';

interface Props {
  campaign: CampaignExtendedWithoutDate;
}

const Buttons = ({ campaign }: Props) => {
  const [loading, setLoading] = useState(false);
  const insertCampaign = trpcClient.insertCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) {
        location.href = path.join(basePath, constants.pages.campaigns);
        console.log('There was an error');
      }
      setLoading(false);
    }
  });
  const updateCampaign = trpcClient.updateCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) {
        location.href = path.join(basePath, constants.pages.campaigns);
        console.log('There was an error');
      }
      setLoading(false);
    }
  });

  const returnToCampaigns = () => {
    location.href = path.join(basePath, constants.pages.campaigns);
  };

  const handleOnSave = async () => {
    setLoading(true);
    if (campaign.id === undefined) return insertCampaign.mutate(campaign);
    updateCampaign.mutate({
      id: campaign.id,
      values: campaign
    });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
