export type TypeClickOnElementTrigger = {
  readonly id: number;
  type: 'clickOnElement';
  data: {
    selector: string;
  };
};

export type TypeCustomTrigger = {
  readonly id: number;
  type: 'custom';
  data: {
    name: string;
    javascript: string;
  };
};

export type TypePageLoadTrigger = {
  readonly id: number;
  type: 'pageLoad';
  data: Record<string, never>;
};

export type TypeTimeOnPageTrigger = {
  readonly id: number;
  type: 'timeOnPage';
  data: {
    milliseconds: number;
  };
};

export type TypeTriggerData = TypeClickOnElementTrigger | TypeCustomTrigger | TypePageLoadTrigger | TypeTimeOnPageTrigger;
