import { literal, z } from 'zod';

import commonConstants from '@/config/common/constants';
import type { TypeRequirementData } from '@/types/domain';

const zodRequirementsCampaign = (() => {
  const requirements: z.ZodType<TypeRequirementData> = z.discriminatedUnion('type', [
    z.object({
      data: z.object({
        children: z.lazy(() => requirements.array()),
        operator: z.enum([commonConstants.booleanOperators.and, commonConstants.booleanOperators.or]),
      }),
      type: z.literal(commonConstants.requirementTypes.node),
    }),
    z.object({
      data: z.discriminatedUnion('comparator', [
        z.object({
          comparator: z.enum([
            commonConstants.comparisons.is,
            commonConstants.comparisons.isNot,
            commonConstants.comparisons.contains,
            commonConstants.comparisons.doesNotContain,
          ]),
          name: z.string(),
          value: z.string(),
        }),
        z.object({
          comparator: z.enum([commonConstants.comparisons.exists, commonConstants.comparisons.doesNotExist]),
          name: z.string(),
          value: z.undefined().optional(),
        }),
      ]),
      type: z.enum([
        commonConstants.requirementTypes.cookie,
        commonConstants.requirementTypes.localStorage,
        commonConstants.requirementTypes.sessionStorage,
        commonConstants.requirementTypes.queryParam,
      ]),
    }),
    z.object({
      data: z.object({
        javascript: z.string(),
        name: z.string(),
      }),
      type: z.literal(commonConstants.requirementTypes.custom),
    }),
    z.object({
      data: z.object({
        comparator: z.enum([commonConstants.comparisons.is, commonConstants.comparisons.isNot]),
        device: z.enum([commonConstants.devices.desktop, commonConstants.devices.mobile]),
      }),
      type: z.literal(commonConstants.requirementTypes.device),
    }),
    z.object({
      data: z.object({
        comparator: z.enum([
          commonConstants.comparisons.is,
          commonConstants.comparisons.isNot,
          commonConstants.comparisons.contains,
          commonConstants.comparisons.doesNotContain,
        ]),
        value: z.string(),
      }),
      type: z.literal(commonConstants.requirementTypes.url),
    }),
  ]);
  return z.object({
    data: z.object({
      children: z.array(requirements),
      operator: z.enum([commonConstants.booleanOperators.and, commonConstants.booleanOperators.or]),
    }),
    type: literal(commonConstants.requirementTypes.node),
  });
})();

export { zodRequirementsCampaign };
