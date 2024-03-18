const constants = Object.freeze({
  api: {
    audience: {
      read: '/api/audience/read',
      upsert: '/api/audience/upsert'
    },
    campaign: {
      read: '/api/campaign/read',
      upsert: '/api/campaign/upsert'
    }
  },
  database: {
    audience: {
      id: 'id',
      lastModifiedDate: 'lastModifiedDate',
      name: 'name',
      requirements: 'requirements',
      status: 'status'
    },
    campaign: {
      id: 'id',
      lastModifiedDate: 'lastModifiedDate',
      name: 'name',
      requirements: 'requirements',
      status: 'status',
      variations: 'variations'
    },
    order: {
      asc: 'asc',
      desc: 'desc'
    }
  },
  pages: {
    audience: '/audiences/audience',
    audiences: '/audiences',
    bundle: '/api/script',
    campaign: '/campaigns/campaign',
    campaigns: '/campaigns'
  },
  quantitiesAvailable: [5, 10, 15, 20, 25]
} as const);

export default constants;
