'use client';

import React, { useState } from 'react';

import Buttons from './Buttons';
import Name from './Name';
import Requirements from './Requirements';
import styles from './styles.module.scss';
import Triggers from './Triggers';
import Variations from './Variations';
import type { CampaignExtendedWithoutDate } from '../../../../../types/databaseObjects';

type Props = {
  initialCampaign: CampaignExtendedWithoutDate;
  audiences: {
    id: number;
    name: string;
  }[];
};

const Components = ({ audiences, initialCampaign }: Props) => {
  const [campaign, setCampaign] = useState(initialCampaign);

  return (
    <div className={styles.container}>
      <Name campaign={campaign} setCampaign={setCampaign} />
      <Triggers triggers={campaign.triggers} setCampaign={setCampaign} />
      <Requirements
        audiences={audiences}
        requirements={campaign.requirements}
        setCampaign={setCampaign}
      />
      <Variations setCampaign={setCampaign} variations={campaign.variations} />
      <Buttons campaign={campaign} />
    </div>
  );
};

export default Components;
