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
    };
  }

  ready() {
    super.ready();
    this.loadPricing();
  }

  loadPricing() {
    const url = `https://${api.sites[this.testEnv ? "test" : "prod"]}${api.path}${api.params}`;
    window.fetch(url);
  }
}

window.customElements.define('pricing-data-component', PricingDataComponent);
