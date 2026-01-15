import fs from 'node:fs';
import path from 'node:path';
import commonConstants from '@/domain/constants';
import type { TypeCampaignScript } from '@/domain/types';
import db from '@/libs/db';
export const getBuiltScript = async ({ tenantId }: { tenantId: number | string }) => {
  const cacheKey = `tenant_${tenantId}_public_script`;
  const cachedScript = await db.cache.get(cacheKey);

  if (cachedScript) return cachedScript;

  const fileExists = fs.existsSync(path.join(process.cwd(), 'dist', 'script.js'));
  if (!fileExists) return '';

  const campaigns: TypeCampaignScript[] = await db.campaigns.getAllForScript({
    tenantId: Number(tenantId),
  });
  if (campaigns.length === 0) return '';

  const stringWindow = `window.${commonConstants.windowKey} = window.${commonConstants.windowKey} || {}\n;window.${commonConstants.windowKey}.campaignsData = ${JSON.stringify(campaigns)};`;
  const script = fs.readFileSync(path.join(process.cwd(), 'dist', 'script.js'), 'utf-8');
  const fullScript = stringWindow + script;

  await db.cache.save({ key: cacheKey, value: fullScript, ttlMinutes: 1 });
  return fullScript;
};
