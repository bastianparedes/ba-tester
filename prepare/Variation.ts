/* eslint-disable no-eval */
/* eslint-disable no-console */
import cookie from './cookie';
import constants from '../config/constants';

class Variation {
  idVariation: number;
  idCampaign: number;
  html: string;
  css: string;
  javascript: string;
  traffic: number;

  constructor(
    idVariation: number,
    idCampaign: number,
    html: string,
    css: string,
    javascript: string,
    traffic: number
  ) {
    this.idVariation = idVariation;
    this.idCampaign = idCampaign;
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

  getFunction(setCookie: boolean = true): Function {
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
        console.log(
          `AB TEST - Campaign ${this.idCampaign} - Variation ${this.idVariation}`
        );
        if (setCookie) {
          cookie.set(
            constants.cookie.name,
            JSON.stringify({
              idCampaign: this.idCampaign,
              idVariation: this.idVariation
            }),
            constants.cookie.duration
          );
        }

        this.runJavascript();
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export default Variation;
