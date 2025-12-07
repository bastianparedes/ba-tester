import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../config/constants';
import type { TypeCampaignExtended } from '@/types/db';
import api from '@/app/api';
import Loader from '../../../_components/Loader';
import { useState } from 'react';

interface Props {
  campaign: TypeCampaignExtended;
}

const Buttons = ({ campaign }: Props) => {
  const [loading, setLoading] = useState(false);

  const returnToCampaigns = () => {
    location.href = constants.pages.campaigns;
  };

  const handleOnSave = async () => {
    setLoading(true);
    if (campaign.id === undefined) {
      api.createCampaign({ body: campaign });
    } else {
      api.updateCampaign({ pathParams: { id: campaign.id }, body: campaign });
    }
    location.href = constants.pages.campaigns;
    setLoading(false);
  };

  return (
    <>
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={handleOnSave}
          className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold shadow-lg"
        >
          Cancel
        </button>
        <button
          onClick={returnToCampaigns}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg"
        >
          Save Campaign
        </button>
      </div>

      {loading && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
