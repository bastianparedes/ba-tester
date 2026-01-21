export const jsCodeHasCorrectSyntax = (jsCode: string) => {
  try {
    new Function(jsCode);
    return true;
  } catch {
    return false;
  }
};
