// External imports
import cookie from '@/script/utils/cookie';
import queryParam from '@/script/utils/queryParam';

// Internal imports
import { comparatorResolver } from './comparatorResolver';
import commonConstants from '@/config/common/constants';

// Types
import {
  type TypeCookieRequirement,
  type TypeCustomRequirement,
  type TypeDeviceRequirement,
  type TypeLocalStorageRequirement,
  type TypeNodeRequirement,
  type TypeQueryParamRequirement,
  type TypeSessionStorageRequirement,
  type TypeUrlRequirement,
} from '@/types/db/requirement';

// ------------------------------
// Requirement evaluation functions
// ------------------------------

// Evaluate cookie requirement
const requirementCookie = (requirement: TypeCookieRequirement) => {
  const cookieValue = cookie.get({ name: requirement.data.name });
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue,
  });
};

// Evaluate custom JavaScript requirement
const requirementCustom = async (requirement: TypeCustomRequirement) => {
  try {
    const result = await new Promise((resolve) => {
      setTimeout(() => resolve(false), 5000); // Fallback to false after 5s
      eval(requirement.data.javascript);
    });
    return Boolean(result);
  } catch {
    return false;
  }
};

// Evaluate device type requirement
const requirementDevice = (requirement: TypeDeviceRequirement) => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const device = isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;

  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.device,
    obtainedValue: device,
  });
};

// Evaluate localStorage requirement
const requirementLocalStorage = (requirement: TypeLocalStorageRequirement) => {
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate sessionStorage requirement
const requirementSessionStorage = (requirement: TypeSessionStorageRequirement) => {
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate query parameter requirement
const requirementQueryParam = (requirement: TypeQueryParamRequirement) => {
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue,
  });
};

// Evaluate URL requirement
const requirementUrl = (requirement: TypeUrlRequirement) => {
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: location.href,
  });
};

// Evaluate node requirement (combines multiple child requirements)
const requirementNode = async (requirement: TypeNodeRequirement): Promise<boolean> => {
  const booleanPromises = requirement.data.children.map((childData) => {
    const requirementStrategies = {
      cookie: () => requirementCookie(childData as TypeCookieRequirement),
      custom: () => requirementCustom(childData as TypeCustomRequirement),
      device: () => requirementDevice(childData as TypeDeviceRequirement),
      localStorage: () => requirementLocalStorage(childData as TypeLocalStorageRequirement),
      node: () => requirementNode(childData as TypeNodeRequirement),
      sessionStorage: () => requirementSessionStorage(childData as TypeSessionStorageRequirement),
      queryParam: () => requirementQueryParam(childData as TypeQueryParamRequirement),
      url: () => requirementUrl(childData as TypeUrlRequirement),
    };
    const strategy = requirementStrategies[childData.type];
    return strategy();
  });

  const booleans = await Promise.all(booleanPromises);

  // Evaluate combined result based on operator
  const operator = requirement.data.operator;
  if (operator === 'and') return booleans.every(Boolean);
  if (operator === 'or') return booleans.some(Boolean);
  return false;
};

// ------------------------------
// Main Requirement class
// ------------------------------
class Requirement {
  readonly requirementData: TypeNodeRequirement;

  constructor(requirementData: TypeNodeRequirement) {
    this.requirementData = requirementData;
  }

  // Evaluate the root requirement node
  async evaluate() {
    return requirementNode(this.requirementData);
  }
}

export default Requirement;
