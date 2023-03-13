import { objectType } from 'nexus';

const Status = objectType({
  definition(t) {
    t.int('idStatus');
    t.string('value');
  },
  name: 'Status'
});

export { Status };
