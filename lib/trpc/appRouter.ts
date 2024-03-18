import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import { zodRequirementsCampaign } from './appRouter.helper';
import commonConstants from '../../config/common/constants';
import constants from '../../config/constants';
import {
  getCampaigns,
  insertCampaign,
  updateCampaign
} from '../drizzle/functions';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  getCampaigns: publicProcedure
    .input(
      z.object({
        name: z.string(),
        orderBy: z.enum([
          constants.database.campaign.status,
          constants.database.campaign.name,
          constants.database.campaign.id,
          constants.database.campaign.lastModifiedDate
        ]),
        orderDirection: z.enum(['asc', 'desc']),
        page: z.number().int().nonnegative(),
        quantity: z.number().int().nonnegative(),
        statusList: z.array(z.enum(commonConstants.campaignStatus))
      })
    )
    .mutation(async ({ input }) => {
      return await getCampaigns(input);
    }),

  insertCampaign: publicProcedure
    .input(
      z.object({
        name: z.string(),
        requirements: zodRequirementsCampaign,
        status: z.enum(commonConstants.campaignStatus),
        triggers: z.array(
          z.discriminatedUnion('type', [
            z.object({
              data: z.object({
                selector: z.string()
              }),
              id: z.number().readonly(),
              type: z.literal(commonConstants.triggerTypes.clickOnElement)
            }),
            z.object({
              data: z.object({
                javascript: z.string(),
                name: z.string()
              }),
              id: z.number().readonly(),
              type: z.literal(commonConstants.triggerTypes.custom)
            }),
            z.object({
              data: z.object({}),
              id: z.number().readonly(),
              type: z.literal(commonConstants.triggerTypes.pageLoad)
            }),
            z.object({
              data: z.object({
                seconds: z.number().int().nonnegative()
              }),
              id: z.number().readonly(),
              type: z.literal(commonConstants.triggerTypes.timeOnPage)
            })
          ])
        ),
        variations: z.array(
          z.object({
            css: z.string(),
            html: z.string(),
            id: z.number().int(),
            javascript: z.string(),
            name: z.string(),
            traffic: z.number().int().min(0).max(100)
          })
        )
      })
    )
    .mutation(async ({ input }) => {
      return await insertCampaign(input);
    }),
  updateCampaign: publicProcedure
    .input(
      z.object({
        id: z.number(),
        values: z.object({
          name: z.string(),
          requirements: zodRequirementsCampaign,
          status: z.enum(commonConstants.campaignStatus),
          triggers: z.array(
            z.discriminatedUnion('type', [
              z.object({
                data: z.object({
                  selector: z.string()
                }),
                id: z.number().readonly(),
                type: z.literal(commonConstants.triggerTypes.clickOnElement)
              }),
              z.object({
                data: z.object({
                  javascript: z.string(),
                  name: z.string()
                }),
                id: z.number().readonly(),
                type: z.literal(commonConstants.triggerTypes.custom)
              }),
              z.object({
                data: z.object({}),
                id: z.number().readonly(),
                type: z.literal(commonConstants.triggerTypes.pageLoad)
              }),
              z.object({
                data: z.object({
                  seconds: z.number().int().nonnegative()
                }),
                id: z.number().readonly(),
                type: z.literal(commonConstants.triggerTypes.timeOnPage)
              })
            ])
          ),
          variations: z.array(
            z.object({
              css: z.string(),
              html: z.string(),
              id: z.number().int(),
              javascript: z.string(),
              name: z.string(),
              traffic: z.number().int().min(0).max(100)
            })
          )
        })
      })
    )
    .mutation(async ({ input }) => {
      return await updateCampaign(input.id, input.values);
    })
});

export { appRouter };
