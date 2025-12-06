import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zodRequirementsCampaign } from './validator.helper';
import commonConstants from '@/config/common/constants';
import constants from '@/config/constants';
import { getCampaigns, insertCampaign } from '@/libs/db/functions';
import { TypeGet, TypePost } from './client';
import { TypeApiResponse } from '@/types/api';

const getSchema = z.object({
  name: z.string(),
  orderBy: z.enum([
    constants.database.campaign.status,
    constants.database.campaign.name,
    constants.database.campaign.id,
    constants.database.campaign.lastModifiedDate,
  ]),
  orderDirection: z.enum(['asc', 'desc']),
  page: z.number().int().nonnegative(),
  quantity: z.number().int().nonnegative(),
  statusList: z.array(z.enum(commonConstants.campaignStatus)),
});

export async function GET(req: NextRequest): TypeApiResponse<TypeGet['response']> {
  const searchParams = req.nextUrl.searchParams;
  const params = Object.fromEntries(searchParams.entries());
  const parseResult = getSchema.safeParse(params);
  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  }
  const validated: TypeGet['queryParams'] = parseResult.data;
  const result = await getCampaigns(validated);
  return NextResponse.json({
    data: result,
  });
}

const insertCampaignSchema = z.object({
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
          seconds: z.number().int().nonnegative(),
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

export async function POST(request: NextRequest): TypeApiResponse<TypePost['response']> {
  const body = await request.json();
  const parseResult = insertCampaignSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  await insertCampaign(validated);
  return NextResponse.json({});
}
