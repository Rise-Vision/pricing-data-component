import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module'

const apiService = "https://get-plans-c3r22v6wha-uc.a.run.app/";

class PricingDataComponent extends PolymerElement {
  static get properties() {
    return {
      prodEnv: {
        type: Boolean,
        value: false,
      },
      data: {
        type: Object,
        value: {}
      },
      retries: {
        type: Number,
        value: 5
      }
    };
  }

  ready() {
    super.ready();
    this.getFromStorage();
    this.loadPricing();
  }

  loadPricing() {
    const url = `${apiService}?env=${this.prodEnv ? "prod" : "test"}`;

    window.fetch(url)
    .then(data=>data.json())
    .then(json=>{
      this.set("data", json);
      this.updateStorage(json);
    })
    .catch(()=>{
      if (this.retries <= 0) return;
      this.set("retries", this.retries - 1);
      setTimeout(()=>this.loadPricing(), 2000);
    });
  }

  getFromStorage() {
    try {
      this.set("data", JSON.parse(window.localStorage.getItem("pricing-data-component")));
    } catch(e) {}
  }

  updateStorage(json) {
    try {
      window.localStorage.setItem("pricing-data-component", JSON.stringify(json));
    } catch(e) {}
  }
}

window.customElements.define('pricing-data-component', PricingDataComponent);
