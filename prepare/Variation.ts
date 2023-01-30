/* eslint-disable no-eval */
/* eslint-disable no-console */
class Variation {
  idVariation: number;
  html: string;
  css: string;
  javascript: string;
  traffic: number;

  constructor(
    idVariation: number,
    html: string,
    css: string,
    javascript: string,
    traffic: number
  ) {
    this.idVariation = idVariation;
    this.html = html;
    this.css = css;
    this.javascript = javascript;
    this.traffic = traffic;
  }

  addHtml(): void {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.outerHTML = this.html;
  }

  addCss(): void {
    const style = document.createElement('style');
    style.innerHTML = this.css;
    document.head.appendChild(style);
  }

  runJavascript(): void {
    eval(this.javascript);
  }

  getFunction(): Function {
    return () => {
      try {
        this.addHtml();
      } catch (error) {
        console.log(error);
      }

      try {
        this.addCss();
      } catch (error) {
        console.log(error);
      }

      try {
        this.runJavascript();
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export default Variation;
