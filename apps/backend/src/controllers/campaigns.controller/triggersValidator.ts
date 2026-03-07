import { z } from 'zod';
import constants from '../../../../domain/constants';
import { jsCodeHasCorrectSyntax } from '../../../../domain/jsCode';

const clickOnElementDataSchema = z.object({
  selector: z.string(),
});

const customTriggerDataSchema = z.object({
  name: z.string(),
  javascript: z.string().refine((val) => jsCodeHasCorrectSyntax(val), {
    message: 'Invalid JavaScript code',
  }),
});

const pageLoadDataSchema = z.object({});

const timeOnPageDataSchema = z.object({
  milliseconds: z.number().int(),
});

export const triggerSchema = z.array(
  z.discriminatedUnion('type', [
    z.object({
      id: z.number().int(),
      type: z.literal(constants.triggerTypes.clickOnElement),
      data: clickOnElementDataSchema,
    }),

    z.object({
      id: z.number().int(),
      type: z.literal(constants.triggerTypes.custom),
      data: customTriggerDataSchema,
    }),

    z.object({
      id: z.number().int(),
      type: z.literal(constants.triggerTypes.pageLoad),
      data: pageLoadDataSchema,
    }),

    z.object({
      id: z.number().int(),
      type: z.literal(constants.triggerTypes.timeOnPage),
      data: timeOnPageDataSchema,
    }),
  ]),
);
