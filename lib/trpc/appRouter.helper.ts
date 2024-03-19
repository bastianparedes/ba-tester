import { literal, z } from 'zod';

import constants from '../../config/common/constants';
import type { RequirementDataCampaign } from '../../types/databaseObjects';

const zodRequirementsCampaign = (() => {
  const requirements: z.ZodType<RequirementDataCampaign> = z.discriminatedUnion(
    'type',
    [
      z.object({
        data: z.object({
          children: z.lazy(() => requirements.array()),
          operator: z.enum([
            constants.booleanOperators.and,
            constants.booleanOperators.or
          ])
        }),
        type: z.literal(constants.requirementTypes.node)
      }),
      z.object({
        data: z.discriminatedUnion('comparator', [
          z.object({
            comparator: z.enum([
              constants.comparisons.is,
              constants.comparisons.isNot,
              constants.comparisons.contains,
              constants.comparisons.doesNotContain
            ]),
            name: z.string(),
            value: z.string()
          }),
          z.object({
            comparator: z.enum([
              constants.comparisons.exists,
              constants.comparisons.doesNotExist
            ]),
            name: z.string(),
            value: z.undefined().optional()
          })
        ]),
        type: z.enum([
          constants.requirementTypes.cookie,
          constants.requirementTypes.localStorage,
          constants.requirementTypes.sessionStorage,
          constants.requirementTypes.queryParam
        ])
      }),
      z.object({
        data: z.object({
          javascript: z.string(),
          name: z.string()
        }),
        type: z.literal(constants.requirementTypes.custom)
      }),
      z.object({
        data: z.object({
          comparator: z.enum([
            constants.comparisons.is,
            constants.comparisons.isNot
          ]),
          device: z.enum([constants.devices.desktop, constants.devices.mobile])
        }),
        type: z.literal(constants.requirementTypes.device)
      }),
      z.object({
        data: z.object({
          comparator: z.enum([
            constants.comparisons.is,
            constants.comparisons.isNot,
            constants.comparisons.contains,
            constants.comparisons.doesNotContain
          ]),
          value: z.string()
        }),
        type: z.literal(constants.requirementTypes.url)
      })
    ]
  );
  return z.object({
    data: z.object({
      children: z.array(requirements),
      operator: z.enum([
        constants.booleanOperators.and,
        constants.booleanOperators.or
      ])
    }),
    type: literal(constants.requirementTypes.node)
  });
})();

export { zodRequirementsCampaign };
