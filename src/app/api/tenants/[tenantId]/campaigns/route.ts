import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zodRequirementsCampaign } from './validator.helper';
import commonConstants from '@/config/common/constants';
import config from '@/config/constants';
import db from '@/libs/db';
import { TypeGet, TypePost } from './client';
import { TypeApiResponse } from '@/types/api';

const getSchema = z.object({
  name: z.string(),
  orderBy: z.enum([config.database.campaign.status, config.database.campaign.name, config.database.campaign.id]),
  orderDirection: z.enum(commonConstants.campaignOrderDirection),
  page: z.coerce.number().int().nonnegative(),
  quantity: z.coerce.number().refine((val) => config.quantitiesAvailable.includes(val), {
    message: `Debe ser uno de: ${config.quantitiesAvailable.join(', ')}`,
  }),
  statusList: z
    .union([z.string().transform((val) => [val]), z.array(z.string())])
    .pipe(z.array(z.enum(commonConstants.campaignStatus))),
});

export async function GET(
  req: NextRequest,
  { params: promiseParams }: { params: Promise<{ tenantId: string }> },
): TypeApiResponse<TypeGet['response']> {
  const params = await promiseParams;
  const tenantId = parseInt(params.tenantId);
  const searchParams = req.nextUrl.searchParams;
  const queryParams = {
    name: searchParams.get('name'),
    orderBy: searchParams.get('orderBy'),
    orderDirection: searchParams.get('orderDirection'),
    page: searchParams.get('page'),
    quantity: searchParams.get('quantity'),
    statusList: searchParams.getAll('statusList'),
  };
  const parseResult = getSchema.safeParse(queryParams);
  if (!parseResult.success) {
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  }
  const validated: TypeGet['queryParams'] = parseResult.data;
  const result = await db.getCampaigns({ tenantId }, validated);
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

export async function POST(
  request: NextRequest,
  { params: promiseParams }: { params: Promise<{ tenantId: string }> },
): TypeApiResponse<TypePost['response']> {
  const params = await promiseParams;
  const tenantId = parseInt(params.tenantId);
  const body = await request.json();
  const parseResult = insertCampaignSchema.safeParse(body);
  if (!parseResult.success)
    return NextResponse.json({ errors: parseResult.error.issues.map((error) => error.message) }, { status: 400 });
  const validated: TypePost['body'] = parseResult.data;
  await db.insertCampaign({ tenantId }, validated);
  return NextResponse.json({});
}
