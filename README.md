# \<pricing-data-component\>

Fetches pricing data from Chargebee

# Test

Start a local http server and then browse to pricing-data-component-test.html
It's best to load with devtools open and cache disabled.

This project does not use WCT since it is [not well supported](https://github.com/Polymer/tools/issues/3398)

# Usage

``` html
<html>
  <head>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js"></script>
    <script type="module" src="pricing-data-component.mjs"></script>
  </head>
  <body>
    <pricing-data-component></pricing-data-component>
  </body>
</html>
```

The webcomponents-loader.js is a Polymer [requirement](https://polymer-library.polymer-project.org/3.0/docs/polyfills).
