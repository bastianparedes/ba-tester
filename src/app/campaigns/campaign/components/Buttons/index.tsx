import React, { useState } from 'react';

import path from 'path';

import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../../config/constants';
import { trpcClient } from '../../../../../../lib/trpc/client';
import { basePath } from '../../../../../../next.config';
import type { CampaignExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import Loader from '../../../_components/Loader';

interface Props {
  campaign: CampaignExtendedWithoutDate;
}

const Buttons = ({ campaign }: Props) => {
  const insertCampaign = trpcClient.insertCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) return window.alert('There was an error');
      location.href = path.join(basePath, constants.pages.campaigns);
    }
  });
  const updateCampaign = trpcClient.updateCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) return window.alert('There was an error');
      location.href = path.join(basePath, constants.pages.campaigns);
    }
  });

  const returnToCampaigns = () => {
    location.href = path.join(basePath, constants.pages.campaigns);
  };

  const handleOnSave = async () => {
    if (campaign.id === undefined) return insertCampaign.mutate(campaign);
    updateCampaign.mutate({
      id: campaign.id,
      values: campaign
    });
  };

  return (
    <>
      {(insertCampaign.isLoading || updateCampaign.isLoading) && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
