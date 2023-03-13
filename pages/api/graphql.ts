import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createContext } from '../../graphql/context';
import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/shchema';

const apolloServer = new ApolloServer({
  context: createContext(),
  resolvers,
  typeDefs
});
const startServer = apolloServer.start();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
};

const config = {
  api: {
    bodyParser: false
  }
};

export { config };
export default handler;
