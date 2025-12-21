import { type TypeCustomRequirement } from '@/types/db/requirement';

const requirementCustom = async (requirement: TypeCustomRequirement) => {
  try {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 5000);

      eval(requirement.data.javascript);
    });
    return Boolean(result);
  } catch {
    return false;
  }
};

export default requirementCustom;
