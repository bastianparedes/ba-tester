import { extendType, objectType } from 'nexus';

const Status = objectType({
  definition(t) {
    t.int('idStatus');
    t.string('value');
  },
  name: 'Status'
});

const StatusQuery = extendType({
  definition(t) {
    t.list.field('status', {
      async resolve(_parent, _args, ctx) {
        return ctx.prisma.status.findMany();
      },
      type: 'Status'
    });
  },
  type: 'Query'
});

export { Status, StatusQuery };
