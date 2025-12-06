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
      {loading && <Loader />}
      <div className={styles.container}>
        <Save campaign={campaign} onClick={handleOnSave} />
        <Cancel onClick={returnToCampaigns} />
      </div>
    </>
  );
};

export default Buttons;
