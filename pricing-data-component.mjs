import {PolymerElement} from "https://unpkg.com/@polymer/polymer@3.2.0/polymer-element.js?module"
import {microTask} from "https://unpkg.com/@polymer/polymer@3.2.0/lib/utils/async.js?module"
import {Debouncer} from "https://unpkg.com/@polymer/polymer@3.2.0/lib/utils/debounce.js?module"

const apiService = "https://get-plans-c3r22v6wha-uc.a.run.app/";

class PricingDataComponent extends PolymerElement {
  static get properties() {
    return {
      prodEnv: {
        type: Boolean,
        value: false,
        observer: "prodEnvUpdated"
      },
      logging: {
        type: Boolean,
        value: false
      },
      pricingData: {
        type: Object,
        value: {},
        notify: true
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
  }

  prodEnvUpdated() {
    this._debounceJob = Debouncer.debounce(this._debounceJob, microTask, ()=>this.loadPricing());
  }

  loadPricing() {
    const url = `${apiService}?env=${this.prodEnv ? "prod" : "test"}`;

    window.fetch(url)
    .then(data=>data.json())
    .then(json=>{
      this.set("pricingData", json);
      this.updateStorage(json);
    })
    .catch(()=>{
      if (this.retries <= 0) {
        this.set("pricingData", {failed: true});
        return;
      }

      this.set("retries", this.retries - 1);
      setTimeout(()=>this.loadPricing(), 2000);
    });
  }

  getFromStorage() {
    try {
      this.set("pricingData", JSON.parse(window.localStorage.getItem("pricing-data-component")));
      if (this.logging && this.pricingData && Object.keys(this.pricingData).length) {
        console.log("Retrieved data from local storage")
      }
    } catch(e) {}
  }

  updateStorage(json) {
    try {
      window.localStorage.setItem("pricing-data-component", JSON.stringify(json));
      if (this.logging) {console.log("Local storage data updated")}
    } catch(e) {}
  }
}

window.customElements.define("pricing-data-component", PricingDataComponent);
