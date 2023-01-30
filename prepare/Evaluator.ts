class Evaluator {
  idEvaluator: number;
  maxTimeToResolve: number;
  stringToReplace: string;
  code: string;
  argumentsModel: string;
  bodyModel: string;

  constructor(idEvaluator: number, code: string) {
    this.idEvaluator = idEvaluator;
    this.maxTimeToResolve = 5000;
    this.stringToReplace = '<CODE>';
    this.code = code;
    this.argumentsModel = 'resolve';
    this.bodyModel = `
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, ${String(this.maxTimeToResolve)});
        try {
          ${this.stringToReplace};
        } catch {
          resolve(false);
        }
      });
    `;
  }

  async evaluate(): Promise<boolean> {
    return this.getFunction()().then((result: any) => Boolean(result));
  }

  getFunction(): Function {
    return new Function(
      this.argumentsModel,
      this.bodyModel.replace(this.stringToReplace, this.code)
    );
  }
}

export default Evaluator;
