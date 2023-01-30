const constants = {
  cookie: {
    duration: 20,
    name: 'ab_test'
  },
  fetch: {
    method: {
      delete: 'DELETE',
      get: 'GET',
      post: 'POST',
      put: 'PUT'
    }
  },
  newCampaign: {
    evaluator: [],
    idCampaign: 0,
    idStatus: 0,
    name: 'New Campaign Name',
    status: {
      idStatus: 0,
      value: 'active'
    },
    variation: []
  },
  path: {
    campaign: '/campaign',
    getCampaigns: '/api/getCampaigns',
    upsertCampaign: '/api/upsertCampaign'
  },
  status: {
    active: 'active',
    deleted: 'deleted',
    inactive: 'inactive'
  }
};

export default constants;
