import { prisma } from '../lib/prisma';

const main = async (): Promise<void> => {
  await prisma.status.createMany({
    data: [
      { idStatus: 0, value: 'inactive' },
      { idStatus: 1, value: 'active' },
      { idStatus: 2, value: 'deleted' }
    ]
  });
};

main()
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
