// import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { createContext } from '../../graphql/context';
import { schema } from '../../graphql/shchema';

const apolloServer = new ApolloServer({
  context: createContext(),
  schema
});
const startServer = apolloServer.start();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: '*'
  });

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
