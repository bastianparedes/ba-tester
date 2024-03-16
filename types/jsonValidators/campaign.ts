import Ajv from 'ajv';

import type { CampaignExtendedWithoutDate } from '../databaseObjects';

const ajv = new Ajv();

const validateFirstNodeInRequirements = ajv.compile({
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
  required: ['data', 'type'],
  type: 'object'
});

const validateRequirements = ajv.compile({
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
      required: ['data', 'type'],
      type: 'object'
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
      required: ['data', 'type'],
      type: 'object'
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
      required: ['data', 'type'],
      type: 'object'
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
      required: ['data', 'type'],
      type: 'object'
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
      required: ['data', 'type'],
      type: 'object'
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
      required: ['data', 'type'],
      type: 'object'
    }
  ],
  type: 'object'
});

const validateTriggers = ajv.compile({
  items: {
    oneOf: [
      {
        additionalProperties: false,
        properties: {
          data: {
            additionalProperties: false,
            properties: {
              selector: {
                type: 'string'
              }
            },
            required: ['selector'],
            type: 'object'
          },
          id: {
            type: 'integer'
          },
          type: {
            const: 'clickOnElement'
          }
        },
        required: ['id', 'data', 'type'],
        type: 'object'
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
          id: {
            type: 'integer'
          },
          type: {
            const: 'custom'
          }
        },
        required: ['id', 'data', 'type'],
        type: 'object'
      },
      {
        additionalProperties: false,
        properties: {
          data: {
            additionalProperties: false,
            properties: {},
            type: 'object'
          },
          id: {
            type: 'integer'
          },
          type: {
            const: 'pageLoad'
          }
        },
        required: ['id', 'type'],
        type: 'object'
      },
      {
        additionalProperties: false,
        properties: {
          data: {
            additionalProperties: false,
            properties: {
              seconds: {
                type: 'integer'
              }
            },
            required: ['seconds'],
            type: 'object'
          },
          id: {
            type: 'integer'
          },
          type: {
            const: 'timeOnPage'
          }
        },
        required: ['id', 'data', 'type'],
        type: 'object'
      }
    ]
  },
  type: 'array'
});

const validateVariations = ajv.compile({
  items: {
    additionalProperties: false,
    properties: {
      css: {
        type: 'string'
      },
      html: {
        type: 'string'
      },
      id: {
        type: 'integer'
      },
      javascript: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      traffic: {
        type: 'number'
      }
    },
    required: ['css', 'html', 'id', 'javascript', 'name', 'traffic'],
    type: 'object'
  },
  type: 'array'
});

const validateCampaign = (
  posibleCampaign: unknown
): posibleCampaign is CampaignExtendedWithoutDate => {
  return (
    validateTriggers(posibleCampaign) &&
    validateFirstNodeInRequirements(posibleCampaign) &&
    validateRequirements(posibleCampaign) &&
    validateVariations(posibleCampaign)
  );
};

export { validateCampaign };
