import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const getBundle = async (_req: NextApiRequest, res: NextApiResponse) => {
  const fileExists = fs.existsSync(
    path.join(process.cwd(), 'dist', 'script.js')
  );

  if (!fileExists) {
    try {
    } catch {
      res.send('');
    }
  }

  const script = fs.readFileSync(
    path.join(process.cwd(), 'dist', 'script.js'),
    'utf-8'
  );

  res.send(script);
};

export default getBundle;
