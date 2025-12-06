import * as campaigns from './campaigns/client';
import * as campaign from './campaigns/[id]/client';

export default {
  ...campaigns,
  ...campaign,
};
