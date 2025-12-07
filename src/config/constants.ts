const constants = Object.freeze({
  api: {
    campaign: {
      read: '/api/campaign/read',
      upsert: '/api/campaign/upsert',
    },
  },
  database: {
    campaign: {
      id: 'id',
      name: 'name',
      requirements: 'requirements',
      status: 'status',
      variations: 'variations',
    },
    order: {
      asc: 'asc',
      desc: 'desc',
    },
  },
  pages: {
    bundle: '/api/public/script',
    campaign: '/campaigns/campaign',
    campaigns: '/campaigns',
    example: '/example',
  },
  quantitiesAvailable: [25, 50, 100, 200, 500] as number[],
} as const);

export default constants;
