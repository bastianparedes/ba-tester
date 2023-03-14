import type { PrismaClient } from '@prisma/client';

import prisma from '../lib/prisma';

interface Context {
  prisma: PrismaClient;
}

const createContext = (_res = {}, _req = {}): Context => {
  return {
    prisma
  };
};

export type { Context };

export { createContext };
