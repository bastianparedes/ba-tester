import type { TypeDirection } from '../types/constants';
import type { TypeTenant } from '../types/tenant';
import type { TypeOrderTrackEventBy, TypeTrackEvent, TypeTrackEventForMenu, TypeTrackEventUpdatable } from '../types/trackEvents';

export type TypeApiTrackEvents = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTrackEvent['tenantId']; trackEventId: TypeTrackEvent['id'] };
    };
    response: {
      trackEvent: TypeTrackEvent;
    };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      queryParams: {
        textSearch: string;
        orderBy: TypeOrderTrackEventBy;
        orderDirection: TypeDirection;
        page: number;
        quantity: number;
        statusList: TypeTrackEvent['status'][];
      };
    };
    response: {
      trackEvents: TypeTrackEventForMenu[];
      count: number;
    };
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id'] };
      body: TypeTrackEventUpdatable;
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; trackEventId: TypeTrackEvent['id'] };
      body: TypeTrackEventUpdatable;
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: TypeTenant['id']; trackEventId: TypeTrackEvent['id'] };
    };
    response: Record<string, never>;
  };
};
