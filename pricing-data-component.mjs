import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer@next/polymer-element.js?module'

class PricingDataComponent extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'pricing-data-component',
      },
    };
  }
}

window.customElements.define('pricing-data-component', PricingDataComponent);
