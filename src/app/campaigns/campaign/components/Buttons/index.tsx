import React, { useState } from 'react';

import path from 'path';

import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../../config/constants';
import { basePath } from '../../../../../../next.config';
import type { CampaignExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import Loader from '../../../../common/Loader';

interface Props {
  campaign: CampaignExtendedWithoutDate;
}

const Buttons = ({ campaign }: Props) => {
  const [loading, setLoading] = useState(false);
  const returnToCampaigns = () => {
    location.href = path.join(basePath, constants.pages.campaigns);
  };

  const handleOnSave = async () => {
    setLoading(true);
    await fetch(path.join(basePath, constants.api.campaign.upsert), {
      body: JSON.stringify({ campaign }),
      method: 'POST'
    });
    setLoading(false);
    returnToCampaigns();
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
