import React from 'react';

import Requirement from './Requirement';
import styles from './styles.module.scss';
import type { TypeCampaignExtended } from '@/types/db';
import { useTranslationContext } from '../../../_contexts/useTranslation';

interface Props {
  requirements: TypeCampaignExtended['requirements'];
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Requirements = ({ setCampaign, requirements }: Props) => {
  const translation = useTranslationContext();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{translation.campaign.requirements.title}</h2>
      </header>
      <div className={styles.requirementsContainer}>
        <Requirement
          grandParentNode={null}
          id={'0'}
          index={0}
          parentNode={null}
          requirement={requirements}
          setCampaign={setCampaign}
        />
      </div>
    </div>
  );
};

export default Requirements;
