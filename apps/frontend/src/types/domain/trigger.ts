export type TypeBaseTriggerData = {
  readonly id: number;
};

export type TypeClickOnElementTrigger = TypeBaseTriggerData & {
  type: 'clickOnElement';
  data: {
    selector: string;
  };
};

export type TypeCustomTrigger = TypeBaseTriggerData & {
  type: 'custom';
  data: {
    name: string;
    javascript: string;
  };
};

export type TypePageLoadTrigger = TypeBaseTriggerData & {
  type: 'pageLoad';
  data: Record<string, never>;
};

export type TypeTimeOnPageTrigger = TypeBaseTriggerData & {
  type: 'timeOnPage';
  data: {
    milliseconds: number;
  };
};

export type TypeTriggerData =
  | TypeClickOnElementTrigger
  | TypeCustomTrigger
  | TypePageLoadTrigger
  | TypeTimeOnPageTrigger;
