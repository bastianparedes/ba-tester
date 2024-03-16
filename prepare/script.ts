import setCampaigns from './processes/setCampaigns';
// import setEvents from './processes/setSaveEvents';
import setUtils from './processes/setUtils';

const script = async () => {
  setUtils();
  // setEvents();
  setCampaigns();
};

script();
