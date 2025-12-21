import { comparatorResolver } from './comparatorResolver';
import cookie from '@/script/utils/cookie';
import { type TypeCookieRequirement } from '@/types/db/requirement';

const requirementCookie = (requirement: TypeCookieRequirement) => {
  const cookieValue = cookie.get({ name: requirement.data.name });
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue,
  });
};

export default requirementCookie;
