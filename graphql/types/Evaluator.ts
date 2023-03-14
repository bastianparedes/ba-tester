import { extendType, intArg, objectType } from 'nexus';

const Evaluator = objectType({
  definition(t) {
    t.int('idEvaluator');
    t.int('idCampaign');
    t.string('name');
    t.string('javascript');
  },
  name: 'Evaluator'
});

const EvaluatorQuery = extendType({
  definition(t) {
    t.list.field('evaluator', {
      args: {
        idCampaign: intArg()
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.evaluator.findMany({
          where: {
            idCampaign: args.idCampaign
          }
        });
      },
      type: 'Evaluator'
    });
  },
  type: 'Query'
});

export { Evaluator, EvaluatorQuery };
