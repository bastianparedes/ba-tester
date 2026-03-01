// External imports

import commonConstants from '../../../../../domain/constants';
// Types
import type { TypeRequirementScript } from '../../../../../domain/types/script';
import cookie from '../../utils/cookie';
import queryParam from '../../utils/queryParam';
// Internal imports
import { comparatorResolver } from './comparatorResolver';

// ------------------------------
// Requirement evaluation functions
// ------------------------------

// Evaluate cookie requirement
const requirementCookie = async (requirement: Extract<TypeRequirementScript, { type: 'cookie' }>) => {
  const cookieValue = cookie.get({ name: requirement.data.name });
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: cookieValue,
  });
};

// Evaluate custom JavaScript requirement
const requirementCustom = async (requirement: Extract<TypeRequirementScript, { type: 'custom' }>) => {
  return new Promise((resolveRequirement) => {
    const customCodeResult = requirement.data.javascript();
    resolveRequirement(customCodeResult);
    setTimeout(() => resolveRequirement(false), 5000); // Fallback to false after 5s
  })
    .then((result) => Boolean(result))
    .catch(() => false);
};

// Evaluate device type requirement
const requirementDevice = async (requirement: Extract<TypeRequirementScript, { type: 'device' }>) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  const device = isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;

  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.device,
    obtainedValue: device,
  });
};

// Evaluate localStorage requirement
const requirementLocalStorage = async (requirement: Extract<TypeRequirementScript, { type: 'localStorage' }>) => {
  const keyValue = localStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate sessionStorage requirement
const requirementSessionStorage = async (requirement: Extract<TypeRequirementScript, { type: 'sessionStorage' }>) => {
  const keyValue = sessionStorage.getItem(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: keyValue,
  });
};

// Evaluate query parameter requirement
const requirementQueryParam = async (requirement: Extract<TypeRequirementScript, { type: 'queryParam' }>) => {
  const queryParamValue = queryParam.get(requirement.data.name);
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: queryParamValue,
  });
};

// Evaluate URL requirement
const requirementUrl = async (requirement: Extract<TypeRequirementScript, { type: 'url' }>) => {
  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.value,
    obtainedValue: location.href,
  });
};

// Evaluate node requirement (combines multiple child requirements)
const requirementNode = async (requirement: Extract<TypeRequirementScript, { type: 'node' }>): Promise<boolean> => {
  const booleanPromises = requirement.data.children.map((childData) => {
    const requirementStrategies = {
      cookie: () => requirementCookie(childData as Extract<TypeRequirementScript, { type: 'cookie' }>),
      custom: () => requirementCustom(childData as Extract<TypeRequirementScript, { type: 'custom' }>),
      device: () => requirementDevice(childData as Extract<TypeRequirementScript, { type: 'device' }>),
      localStorage: () => requirementLocalStorage(childData as Extract<TypeRequirementScript, { type: 'localStorage' }>),
      node: () => requirementNode(childData as Extract<TypeRequirementScript, { type: 'node' }>),
      sessionStorage: () => requirementSessionStorage(childData as Extract<TypeRequirementScript, { type: 'sessionstorage' }>),
      queryParam: () => requirementQueryParam(childData as Extract<TypeRequirementScript, { type: 'queryParam' }>),
      url: () => requirementUrl(childData as Extract<TypeRequirementScript, { type: 'url' }>),
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
  readonly requirementData: Extract<TypeRequirementScript, { type: 'node' }>;

  constructor(requirementData: Extract<TypeRequirementScript, { type: 'node' }>) {
    this.requirementData = requirementData;
  }

  // Evaluate the root requirement node
  async evaluate() {
    return requirementNode(this.requirementData).catch(() => false);
  }
}

export default Requirement;
