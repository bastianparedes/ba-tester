import { initCampaigns } from './processes/initCampaigns';
import { setUtils } from './processes/setUtils';
import { setTrackEvents } from './processes/trackEvents';

const script = async () => {
  setUtils();
  setTrackEvents();
  initCampaigns();
};

script();
