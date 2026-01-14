import type { TypeVariationData } from '@/types/domain';

class Variation {
  data: TypeVariationData;
  readonly idCampaign: number;

  constructor(data: TypeVariationData, idCampaign: number) {
    this.data = data;
    this.idCampaign = idCampaign;
  }

  addCss() {
    const style = document.createElement('style');
    style.innerHTML = this.data.css;
    document.head.appendChild(style);
  }

  addHtml() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.outerHTML = this.data.html;
  }

  runJavascript() {
    eval(this.data.javascript);
  }

  run() {
    try {
      this.addHtml();
    } catch (error) {
      console.error('ERROR adding HTML', error);
    }

    try {
      this.addCss();
    } catch (error) {
      console.error('ERROR adding CSS', error);
    }

    try {
      this.runJavascript();
    } catch (error) {
      console.error('ERROR running JavaScript', error);
    }
  }
}

export default Variation;
