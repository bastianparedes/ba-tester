import { PrismaClient } from '@prisma/client';

export const prisma = (global as any).prisma ?? new PrismaClient();
