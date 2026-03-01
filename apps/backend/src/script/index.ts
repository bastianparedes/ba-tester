import { initCampaigns } from './processes/initCampaigns';
import { setUtils } from './processes/setUtils';

const script = async () => {
  setUtils();
  initCampaigns();
};

script();
