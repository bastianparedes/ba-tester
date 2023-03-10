import React, { useState } from 'react';

import { Loader } from 'bastianparedes/components';

import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../config/constants';
import { basePath } from '../../../next.config';
import type { campaignWithVariationsEvaluatorsStatus } from '../../../types/databaseObjects';

interface props {
  campaign: campaignWithVariationsEvaluatorsStatus;
}

const Buttons = ({ campaign }: props): JSX.Element => {
  const [showLoader, setShowLoader] = useState(false);
  const returnToCampaigns = (): void => {
    location.pathname = '/';
  };

  const handleOnSave = (): void => {
    setShowLoader(true);

    fetch(String(basePath) + constants.path.upsertCampaign, {
      body: JSON.stringify({ campaign }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })
      .then(() => {
        returnToCampaigns();
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <>
      {showLoader && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
