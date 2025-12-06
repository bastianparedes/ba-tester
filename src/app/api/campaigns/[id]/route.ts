// app/api/campaigns/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zodRequirementsCampaign } from '../validator.helper';
import commonConstants from '@/config/common/constants';
import { updateCampaign } from '@/libs/db/functions';

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
    }

    const body = await request.json();
    const validated = updateCampaignSchema.parse(body);

    const result = await updateCampaign(id, validated);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }

    console.error('Error updating campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
