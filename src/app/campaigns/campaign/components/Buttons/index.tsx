import Cancel from './Cancel';
import Save from './Save';
import styles from './styles.module.scss';
import constants from '../../../../../config/constants';
import { trpcClient } from '@/libs/trpc/client';
import type { TypeCampaignExtendedWithoutDate } from '@/types/databaseObjects';
import Loader from '../../../_components/Loader';

interface Props {
  campaign: TypeCampaignExtendedWithoutDate;
}

const Buttons = ({ campaign }: Props) => {
  const insertCampaign = trpcClient.insertCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) return window.alert('There was an error');
      location.href = constants.pages.campaigns;
    },
  });
  const updateCampaign = trpcClient.updateCampaign.useMutation({
    onSettled(_data, error) {
      if (error !== null) return window.alert('There was an error');
      location.href = constants.pages.campaigns;
    },
  });

  const returnToCampaigns = () => {
    location.href = constants.pages.campaigns;
  };

  const handleOnSave = async () => {
    if (campaign.id === undefined) return insertCampaign.mutate(campaign);
    updateCampaign.mutate({
      id: campaign.id,
      values: campaign,
    });
  };

  return (
    <>
      {(insertCampaign.isPending || updateCampaign.isPending) && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
