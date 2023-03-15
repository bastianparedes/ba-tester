import { extendType, intArg, objectType } from 'nexus';

// import { Evaluator } from './Evaluator';
import { Status } from './Status';
// import { Variation } from './Variation';

const Campaign = objectType({
  definition(t) {
    t.int('idCampaign');
    t.string('name');
    t.int('idStatus');
  },
  name: 'Campaign'
});

const CampaignWithStatus = extendType({
  definition(t) {
    t.field('status', {
      type: Status
    });
  },
  type: Campaign.name
});

const CampaignQuery = extendType({
  definition(t) {
    t.field('campaign', {
      args: {
        idCampaign: intArg()
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.campaign.findUnique({
          where: {
            idCampaign: args.idCampaign
          }
        });
      },
      type: Campaign
    });
  },
  type: 'Query'
});

export { Campaign, CampaignWithStatus, CampaignQuery };
