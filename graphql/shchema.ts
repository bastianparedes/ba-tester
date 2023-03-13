import { makeSchema } from 'nexus';
import { join } from 'path';

import * as types from './types';

const schema = makeSchema({
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts')
  },
  outputs: {
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
    typegen: join(
      process.cwd(),
      'node_modules',
      '@types',
      'nexus-typegen',
      'index,d,ts'
    )
  },
  types
});

export { schema };
