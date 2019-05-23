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
    this.getFromStorage();
    this.loadPricing();
  }

  loadPricing() {
    const url = `https://${api.sites[this.testEnv ? "test" : "prod"]}${api.path}${api.params}`;

    window.fetch(url, {headers: {"Authorization": api.auth.test}})
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
