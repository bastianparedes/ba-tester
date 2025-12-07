'use client';

import React, { useState } from 'react';

import Buttons from './Buttons';
import Requirements from './Requirements';

import Triggers from './Triggers';
import Variations from './Variations';
import type { TypeCampaignExtended } from '@/types/db';

type Props = {
  initialCampaign: TypeCampaignExtended;
};

const Components = ({ initialCampaign }: Props) => {
  const [campaign, setCampaign] = useState(initialCampaign);

  return (
    <div className="w-4/5 mx-auto my-8 relative flex flex-col gap-8">
      {/* NAME */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Name</h2>
        <input
          type="text"
          value={campaign.name}
          onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter action name"
        />
      </div>

      <Triggers triggers={campaign.triggers} setCampaign={setCampaign} />
      <Requirements requirements={campaign.requirements} setCampaign={setCampaign} />
      <Variations setCampaign={setCampaign} variations={campaign.variations} />
      <Buttons campaign={campaign} />
    </div>
  );
};

export default Components;
