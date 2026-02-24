// External imports

import commonConstants from '../../../../../domain/constants';
// Types
import type { TypeRequirement } from '../../../../../domain/types/script';
import cookie from '../../utils/cookie';
import queryParam from '../../utils/queryParam';
// Internal imports
import { comparatorResolver } from './comparatorResolver';

// ------------------------------
// Requirement evaluation functions
// ------------------------------

// Evaluate cookie requirement
const requirementCookie = (requirement: Extract<TypeRequirement, { type: 'cookie' }>) => {
  const cookieValue = cookie.get({ name: requirement.data.name });
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue,
  });
};

// Evaluate custom JavaScript requirement
const requirementCustom = async (requirement: Extract<TypeRequirement, { type: 'custom' }>) => {
  try {
    const result = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(false), 5000); // Fallback to false after 5s
      requirement.data.javascript(resolve);
    });
    return Boolean(result);
  } catch {
    return false;
  }
};

// Evaluate device type requirement
const requirementDevice = (requirement: Extract<TypeRequirement, { type: 'device' }>) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  const device = isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;

  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.device,
    obtainedValue: device,
  });
};

// Evaluate localStorage requirement
const requirementLocalStorage = (requirement: Extract<TypeRequirement, { type: 'localStorage' }>) => {
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate sessionStorage requirement
const requirementSessionStorage = (requirement: Extract<TypeRequirement, { type: 'sessionStorage' }>) => {
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate query parameter requirement
const requirementQueryParam = (requirement: Extract<TypeRequirement, { type: 'queryParam' }>) => {
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue,
  });
};

// Evaluate URL requirement
const requirementUrl = (requirement: Extract<TypeRequirement, { type: 'url' }>) => {
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: location.href,
  });
};

// Evaluate node requirement (combines multiple child requirements)
const requirementNode = async (requirement: Extract<TypeRequirement, { type: 'node' }>): Promise<boolean> => {
  const booleanPromises = requirement.data.children.map((childData) => {
    const requirementStrategies = {
      cookie: () => requirementCookie(childData as Extract<TypeRequirement, { type: 'cookie' }>),
      custom: () => requirementCustom(childData as Extract<TypeRequirement, { type: 'custom' }>),
      device: () => requirementDevice(childData as Extract<TypeRequirement, { type: 'device' }>),
      localStorage: () => requirementLocalStorage(childData as Extract<TypeRequirement, { type: 'localStorage' }>),
      node: () => requirementNode(childData as Extract<TypeRequirement, { type: 'node' }>),
      sessionStorage: () => requirementSessionStorage(childData as Extract<TypeRequirement, { type: 'sessionstorage' }>),
      queryParam: () => requirementQueryParam(childData as Extract<TypeRequirement, { type: 'queryParam' }>),
      url: () => requirementUrl(childData as Extract<TypeRequirement, { type: 'url' }>),
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
  readonly requirementData: Extract<TypeRequirement, { type: 'node' }>;

  constructor(requirementData: Extract<TypeRequirement, { type: 'node' }>) {
    this.requirementData = requirementData;
  }

  // Evaluate the root requirement node
  async evaluate() {
    return requirementNode(this.requirementData);
  }
}

export default Requirement;
