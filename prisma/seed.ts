import { seed } from '../utils/database';

seed()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
