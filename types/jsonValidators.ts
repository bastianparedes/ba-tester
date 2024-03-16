import Ajv from 'ajv';

const ajv = new Ajv();

const schemaDataHistory = {
  properties: {
    comparatorHistory: {
      enum: ['atLeast', 'atMost', 'moreThan', 'lessThan', 'exactly']
    },
    limitHistory: {
      enum: ['session', 'oneDay', 'oneWeek', 'oneMonth', 'threeMonths']
    },
    repetitionsHistory: {
      type: 'integer'
    }
  },
  required: ['comparatorHistory', 'limitHistory', 'repetitionsHistory']
};

const validateSchemaNode = ajv.compile({
  additionalProperties: false,
  properties: {
    data: {
      additionalProperties: false,
      properties: {
        children: {
          type: 'array'
        },
        operator: {
          enum: ['and', 'or']
        }
      },
      required: ['children', 'operator'],
      type: 'object'
    },
    type: {
      const: 'node'
    }
  },
  required: ['data', 'type']
});

const validateSchemaRequirementsCampaign = ajv.compile({
  oneOf: [
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            children: {
              items: {
                $ref: '#'
              },
              type: 'array'
            },
            operator: {
              enum: ['and', 'or']
            }
          },
          required: ['children', 'operator'],
          type: 'object'
        },
        type: {
          const: 'node'
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          oneOf: [
            {
              additionalProperties: false,
              properties: {
                comparator: {
                  enum: ['is', 'isNot', 'contains', 'doesNotContain']
                },
                name: {
                  type: 'string'
                },
                value: {
                  type: 'string'
                }
              },
              required: ['comparator', 'name', 'value']
            },
            {
              additionalProperties: false,
              properties: {
                comparator: {
                  enum: ['exists', 'doesNotExist']
                },
                name: {
                  type: 'string'
                }
              },
              required: ['comparator', 'name']
            }
          ]
        },
        type: {
          enum: ['cookie', 'localStorage', 'sessionStorage', 'queryParam']
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            javascript: {
              type: 'string'
            },
            name: {
              type: 'string'
            }
          },
          required: ['javascript', 'name'],
          type: 'object'
        },
        type: {
          const: 'custom'
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            comparator: {
              enum: ['is', 'isNot']
            },
            device: {
              enum: ['desktop', 'mobile']
            }
          },
          required: ['comparator', 'device'],
          type: 'object'
        },
        type: {
          const: 'device'
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            comparator: {
              enum: ['is', 'isNot', 'contains', 'doesNotContain']
            },
            value: {
              type: 'string'
            }
          },
          required: ['comparator', 'value'],
          type: 'object'
        },
        type: {
          const: 'url'
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            id: {
              type: 'integer'
            }
          },
          required: ['id'],
          type: 'object'
        },
        type: {
          const: 'audience'
        }
      },
      required: ['data', 'type']
    }
  ],
  type: 'object'
});

const validateSchemaRequirementsAudience = ajv.compile({
  oneOf: [
    {
      additionalProperties: false,
      properties: {
        data: {
          additionalProperties: false,
          properties: {
            children: {
              items: {
                $ref: '#'
              },
              type: 'array'
            },
            operator: {
              enum: ['and', 'or']
            }
          },
          required: ['children', 'operator'],
          type: 'object'
        },
        type: {
          const: 'node'
        }
      },
      required: ['data', 'type']
    },
    {
      additionalProperties: false,
      properties: {
        data: {
          ...schemaDataHistory,
          additionalProperties: false,
          type: 'object'
        },
        type: {
          const: 'pageViewsHistory'
        }
      },
      required: ['data', 'type']
    }
  ],
  type: 'object'
});

const validateRequirementsCampaign = (schema: Record<string, unknown>) => {
  return (
    validateSchemaNode(schema) && validateSchemaRequirementsCampaign(schema)
  );
};

const validateRequirementsAudience = (schema: Record<string, unknown>) => {
  return (
    validateSchemaNode(schema) && validateSchemaRequirementsAudience(schema)
  );
};

export { validateRequirementsAudience, validateRequirementsCampaign };
