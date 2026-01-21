import setCampaigns from './processes/setCampaigns';
import setUtils from './processes/setUtils';

const script = async () => {
  setUtils();
  setCampaigns();
};

script();
