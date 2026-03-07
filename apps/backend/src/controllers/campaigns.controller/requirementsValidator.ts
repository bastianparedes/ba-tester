import { z } from 'zod';
import constants from '../../../../domain/constants';
import { jsCodeHasCorrectSyntax } from '../../../../domain/jsCode';
import { TypeNodeRequirement } from '../../../../domain/types/campaign';

const StorageComparatorWithValue = z.enum([constants.comparisons.is, constants.comparisons.isNot, constants.comparisons.contains, constants.comparisons.doesNotContain]);

const StorageComparatorWithoutValue = z.enum([constants.comparisons.exists, constants.comparisons.doesNotExist]);

const TypeStorageComparisonDataSchema = z.union([
  z.object({
    name: z.string(),
    comparator: StorageComparatorWithValue,
    value: z.string(),
  }),
  z.object({
    name: z.string(),
    comparator: StorageComparatorWithoutValue,
  }),
]);

const CookieRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.cookie),
  data: TypeStorageComparisonDataSchema,
});

const LocalStorageRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.localStorage),
  data: TypeStorageComparisonDataSchema,
});

const SessionStorageRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.sessionStorage),
  data: TypeStorageComparisonDataSchema,
});

const QueryParamRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.queryParam),
  data: TypeStorageComparisonDataSchema,
});

const CustomRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.custom),
  data: z.object({
    name: z.string(),
    javascript: z.string().refine((val) => jsCodeHasCorrectSyntax(val), {
      message: 'Invalid JavaScript code',
    }),
  }),
});

const DeviceRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.device),
  data: z.object({
    comparator: z.enum([constants.comparisons.is, constants.comparisons.isNot]),
    device: z.enum([constants.devices.desktop, constants.devices.mobile]),
  }),
});

const UrlRequirementSchema = z.object({
  type: z.literal(constants.requirementTypes.url),
  data: z.object({
    comparator: z.enum([constants.comparisons.is, constants.comparisons.isNot, constants.comparisons.contains, constants.comparisons.doesNotContain]),
    value: z.string(),
  }),
});

export const nodeRequirementSchema: z.ZodType<TypeNodeRequirement> = z.lazy(() =>
  z.object({
    type: z.literal(constants.requirementTypes.node),
    data: z.object({
      operator: z.enum([constants.booleanOperators.and, constants.booleanOperators.or]),
      children: z.array(
        z.union([
          nodeRequirementSchema,
          CookieRequirementSchema,
          LocalStorageRequirementSchema,
          SessionStorageRequirementSchema,
          QueryParamRequirementSchema,
          CustomRequirementSchema,
          DeviceRequirementSchema,
          UrlRequirementSchema,
        ]),
      ),
    }),
  }),
);
