import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module'

const api = {
  sites: {
    prod: "risevision.chargebee.com",
    test: "risevision-test.chargebee.com"
  },
  path: "/api/v2/plans",
  auth: {
    prod: "",
    test: "Basic dGVzdF9xamJneWV3czFhTzhMNXhRWWJ1bHhDQTdXYXhONEVYZzo="
  },
  params: '?status[is]="active"&pricing_model[is]="volume"'
};

class PricingDataComponent extends PolymerElement {
  static get properties() {
    return {
      testEnv: {
        type: Boolean,
        value: true,
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
    this.loadPricing();
  }

  loadPricing() {
    const url = `https://${api.sites[this.testEnv ? "test" : "prod"]}${api.path}${api.params}`;

    window.fetch(url)
    .then(data=>data.json())
    .then(json=>this.set("data", json))
    .catch(()=>{
      if (this.retries <= 0) return;
      this.set("retries", this.retries - 1);
      setTimeout(()=>this.loadPricing(), 3000);
    });
  }
}

window.customElements.define('pricing-data-component', PricingDataComponent);
