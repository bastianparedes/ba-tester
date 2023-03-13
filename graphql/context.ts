import type { PrismaClient } from '@prisma/client';

import prisma from '../lib/prisma';

interface Context {
  prisma: PrismaClient;
}

const createContext = async (_res = {}, _req = {}): Promise<Context> => {
  return {
    prisma
  };
};

export type { Context };

export { createContext };
