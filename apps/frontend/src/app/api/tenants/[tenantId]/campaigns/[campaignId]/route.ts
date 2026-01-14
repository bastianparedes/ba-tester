import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import commonConstants from '@/config/common/constants';
import db from '@/libs/db';
import type { TypeApiResponse } from '@/types/api';
import { zodRequirementsCampaign } from '../validator.helper';
import type { TypePut } from './client';

const updateCampaignSchema = z.object({
  name: z.string(),
  requirements: zodRequirementsCampaign,
  status: z.enum(commonConstants.campaignStatus),
  triggers: z.array(
    z.discriminatedUnion('type', [
      z.object({
        data: z.object({
          selector: z.string(),
        }),
        id: z.number().readonly(),
        type: z.literal(commonConstants.triggerTypes.clickOnElement),
      }),
      z.object({
        data: z.object({
          javascript: z.string(),
          name: z.string(),
        }),
        id: z.number().readonly(),
        type: z.literal(commonConstants.triggerTypes.custom),
      }),
      z.object({
        data: z.object({}),
        id: z.number().readonly(),
        type: z.literal(commonConstants.triggerTypes.pageLoad),
      }),
      z.object({
        data: z.object({
          milliseconds: z.number().int().nonnegative(),
        }),
        id: z.number().readonly(),
        type: z.literal(commonConstants.triggerTypes.timeOnPage),
      }),
    ]),
  ),
  variations: z.array(
    z.object({
      css: z.string(),
      html: z.string(),
      id: z.number().int(),
      javascript: z.string(),
      name: z.string(),
      traffic: z.number().int().min(0).max(100),
    }),
  ),
});

export async function PUT(
  request: NextRequest,
  {
    params: promiseParams,
  }: { params: Promise<{ tenantId: string; campaignId: string }> },
): TypeApiResponse<TypePut['response']> {
  const params = await promiseParams;
  const tenantId = parseInt(params.tenantId, 10);
  const campaignId = parseInt(params.campaignId, 10);
  const body = await request.json();
  const parseResult = updateCampaignSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json(
      { errors: parseResult.error.issues.map((error) => error.message) },
      { status: 400 },
    );
  const validated: TypePut['body'] = parseResult.data;

  await db.campaigns.update({ tenantId, campaignId }, validated);
  return NextResponse.json({});
}
