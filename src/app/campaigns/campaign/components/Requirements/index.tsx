import React from 'react';

import Requirement from './Requirement';
import type { TypeCampaignExtended } from '@/types/db';
import { useTranslationContext } from '../../../_contexts/useTranslation';

interface Props {
  requirements: TypeCampaignExtended['requirements'];
  setCampaign: (campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended) => void;
}

const Requirements = ({ setCampaign, requirements }: Props) => {
  const translation = useTranslationContext();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">{translation.campaign.requirements.title}</h2>
      </div>
      <Requirement
        grandParentNode={null}
        id={'0'}
        index={0}
        parentNode={null}
        requirement={requirements}
        setCampaign={setCampaign}
      />
    </div>
  );
};

export default Requirements;
