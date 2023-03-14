import { extendType, intArg, objectType } from 'nexus';

const Variation = objectType({
  definition(t) {
    t.int('idVariation');
    t.int('idCampaign');
    t.string('name');
    t.string('html');
    t.string('css');
    t.string('javascript');
    t.int('traffic');
  },
  name: 'Variation'
});

const VariationQuery = extendType({
  definition(t) {
    t.list.field('variation', {
      args: {
        idCampaign: intArg()
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.variation.findMany({
          where: {
            idCampaign: args.idCampaign
          }
        });
      },
      type: 'Variation'
    });
  },
  type: 'Query'
});

export { Variation, VariationQuery };
