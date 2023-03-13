import type { Context } from './context';

const resolvers = {
  Query: {
    links: () => [
      {
        description: 'description_1',
        id: 'id_1',
        title: 'title_1'
      },
      {
        description: 'description_2',
        id: 'id_2',
        title: 'title_2'
      },
      {
        description: 'description_3',
        id: 'id_3',
        title: 'title_3'
      }
    ]
  },
  users: async (_parent: any, _args: any, context: Context) =>
    await context.prisma.campaign.findMany()
};

export { resolvers };
