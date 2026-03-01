import { Button } from '@/app/_common/components/button';
import { useUser } from '@/app/_common/contexts/User';
import constants from '@/config/constants';
import type { TypeCampaignWithOptionalId } from '@/domain/types';
import { apiCaller } from '@/libs/restClient';

interface Props {
  campaign: TypeCampaignWithOptionalId;
  userMadeChange: { id: string; name: string; date: Date } | null;
  notifyUsersCampaignWasUpdated: () => void;
}

const Buttons = ({ campaign, userMadeChange, notifyUsersCampaignWasUpdated }: Props) => {
  const user = useUser();

  const isNewCampaign = campaign.id === undefined;

  const returnToCampaigns = () => {
    location.href = constants.pages.campaigns({ tenantId: campaign.tenantId });
  };

  const handleOnSave = async () => {
    if (campaign.id === undefined) {
      await apiCaller.campaigns.create({
        pathParams: { tenantId: campaign.tenantId },
        body: campaign,
      });
    } else {
      notifyUsersCampaignWasUpdated();
      await apiCaller.campaigns.update({
        pathParams: { tenantId: campaign.tenantId, campaignId: campaign.id },
        body: campaign,
      });
    }
  };

  return (
    <div className="mt-8 flex justify-end gap-4">
      <Button onClick={returnToCampaigns} variant="destructive">
        Cancel
      </Button>
      <Button
        disabled={(isNewCampaign && !user.permissions.canCreateCampaign) || (!isNewCampaign && !user.permissions.canUpdateCampaign) || !!userMadeChange}
        onClick={handleOnSave}
        variant="default"
      >
        Save Campaign
      </Button>
    </div>
  );
};

export default Buttons;
