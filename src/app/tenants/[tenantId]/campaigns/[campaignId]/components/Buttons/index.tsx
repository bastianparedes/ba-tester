import constants from '@/config/constants';
import type { TypeCampaign } from '@/types/db';
import api from '@/app/api';

interface Props {
  campaign: TypeCampaign;
}

const Buttons = ({ campaign }: Props) => {
  const returnToCampaigns = () => {
    location.href = constants.pages.campaigns({ tenantId: campaign.tenantId });
  };

  const handleOnSave = async () => {
    if (campaign.id === undefined) {
      await api.campaigns.create({ pathParams: { tenantId: campaign.tenantId }, body: campaign });
    } else {
      await api.campaign.update({
        pathParams: { tenantId: campaign.tenantId, campaignId: campaign.id },
        body: campaign,
      });
    }
    location.href = constants.pages.campaigns({ tenantId: campaign.tenantId });
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
