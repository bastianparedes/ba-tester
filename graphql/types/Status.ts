import { extendType, intArg, objectType } from 'nexus';

const Status = objectType({
  definition(t) {
    t.int('idStatus');
    t.string('value');
  },
  name: 'Status'
});

const StatusQuery = extendType({
  definition(t) {
    t.field('status', {
      args: {
        idStatus: intArg()
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.status.findUnique({
          where: {
            idStatus: args.idStatus
          }
        });
      },
      type: 'Status'
    });
  },
  type: 'Query'
});

export { Status, StatusQuery };
