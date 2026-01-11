import constants from '@/config/constants';
import type { TypeCampaign } from '@/types/domain';
import api from '@/app/api';
import { useUser } from '@/app/_common/contexts/User';
import { Button } from '@/app/_common/components/button';

interface Props {
  campaign: TypeCampaign;
}

const Buttons = ({ campaign }: Props) => {
  const user = useUser();

  const isNewCampaign = campaign.id === undefined;

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
      <Button onClick={returnToCampaigns} variant="destructive">
        Cancel
      </Button>
      <Button
        disabled={
          (isNewCampaign && !user.permissions.canCreateCampaign) ||
          (!isNewCampaign && !user.permissions.canUpdateCampaign)
        }
        onClick={handleOnSave}
        variant="default"
      >
        Save Campaign
      </Button>
    </div>
  );
};

export default Buttons;
