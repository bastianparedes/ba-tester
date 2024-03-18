import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import constants from '../../config/common/constants';
import { insertCampaign, updateCampaign } from '../drizzle/functions';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  insertProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        requirements: z.any({}),
        status: z.enum(constants.campaignStatus),
        triggers: z.array(
          z.discriminatedUnion('type', [
            z.object({
              data: z.object({
                selector: z.string()
              }),
              id: z.number().readonly(),
              type: z.literal(constants.triggerTypes.clickOnElement)
            }),
            z.object({
              data: z.object({
                javascript: z.string(),
                name: z.string()
              }),
              id: z.number().readonly(),
              type: z.literal(constants.triggerTypes.custom)
            }),
            z.object({
              data: z.object({}),
              id: z.number().readonly(),
              type: z.literal(constants.triggerTypes.pageLoad)
            }),
            z.object({
              data: z.object({
                seconds: z.number().int().nonnegative()
              }),
              id: z.number().readonly(),
              type: z.literal(constants.triggerTypes.timeOnPage)
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
    })
});

const baseCategorySchema = z.object({
  name: z.string()
});

type Category = z.infer<typeof baseCategorySchema> & {
  subcategories: Category[];
};

const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => {
    const a = categorySchema.array();
    return a;
  })
});

const a = z.union([z.string(), z.number()]);
const b = a.array();
const c = z.array(z.union([z.string(), z.number()]));

export { appRouter };
