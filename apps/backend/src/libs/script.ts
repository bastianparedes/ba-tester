import path from 'node:path';
import { env } from './env';

export const getScriptLocation = () => {
  if (env.NODE_ENV === 'production') return path.join(process.cwd(), 'apps', 'backend', 'build', 'script.js');
  path.join(process.cwd(), 'apps', 'backend', 'build');
  return path.join(process.cwd(), 'build', 'script.js');
};
