import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module'

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
    window.fetch("someurl");
  }
}

window.customElements.define('pricing-data-component', PricingDataComponent);
