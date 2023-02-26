import { seed } from '../utils/database';

seed().finally(() => {
  process.exit(1);
});
