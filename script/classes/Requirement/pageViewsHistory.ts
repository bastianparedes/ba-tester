import comparatorResolver from './comparatorResolver';
import type { ba_tester } from '../../types';
import { getHistory } from '../../utils/info';

type RequirementData = (
  | ba_tester['audiencesData']
  | ba_tester['campaignsData']
)[number]['requirements']['data']['children'][number];

const limitToDays = {
  oneDay: 1,
  oneMonth: 30,
  oneWeek: 7,
  threeMonths: 60
};

const requirementPageViewsHistory = (requirement: RequirementData) => {
  if (requirement.type !== 'pageViewsHistory')
    throw new Error('Type pageViewsHistory expected in requirement');
  const limitHistory = requirement.data.limitHistory;

  if (limitHistory === 'session') {
    const history = getHistory(sessionStorage);
    return comparatorResolver({
      comparator: requirement.data.comparatorHistory,
      expectedValue: requirement.data.repetitionsHistory,
      obtainedValue: history.events.pageView.length
    });
  }

  const history = getHistory(localStorage);

  const filteredByDateHistory = history.events.pageView.filter((pageView) => {
    const currentDate = new Date();
    const diferencia = currentDate.getTime() - pageView.date;
    return (
      Math.floor(diferencia / (1000 * 60 * 60 * 24)) < limitToDays[limitHistory]
    );
  });

  return comparatorResolver({
    comparator: requirement.data.comparatorHistory,
    expectedValue: requirement.data.repetitionsHistory,
    obtainedValue: filteredByDateHistory.length
  });
};

export default requirementPageViewsHistory;
