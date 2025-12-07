import constants from '@/config/constants';
import type { TypeCampaignExtended } from '@/types/db';
import api from '@/app/api';
import { useLoader } from '@/app/_common/contexts/Loader';

interface Props {
  campaign: TypeCampaignExtended;
}

const Buttons = ({ campaign }: Props) => {
  const loader = useLoader();

  const returnToCampaigns = () => {
    location.href = constants.pages.campaigns;
  };

  const handleOnSave = async () => {
    loader.showLoader();
    if (campaign.id === undefined) {
      await api.createCampaign({ body: campaign });
    } else {
      await api.updateCampaign({ pathParams: { id: campaign.id }, body: campaign });
    }
    loader.hideLoader();
    location.href = constants.pages.campaigns;
  };

  return (
    <div className="mt-8 flex justify-end gap-4">
      <button
        onClick={returnToCampaigns}
        className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold shadow-lg"
      >
        Cancel
      </button>
      <button
        onClick={handleOnSave}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg"
      >
        Save Campaign
      </button>
    </div>
  );
};

export default Buttons;
