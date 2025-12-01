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
      lastModifiedDate: 'lastModifiedDate',
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
  quantitiesAvailable: [5, 10, 15, 20, 25],
} as const);

export default constants;
