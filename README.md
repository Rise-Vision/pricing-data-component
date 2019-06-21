# pricing-data-component

Fetches pricing data from Chargebee.

# Usage

As a no-build html import.

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

As a node import

``` bash
npm install Rise-Vision/pricing-data-component
```

Then in a parent component that is an entry point for a bundler

``` js
import "pricing-data-component/lib/pricing-data-component.js"
```

The webcomponents-loader.js is a Polymer [requirement](https://polymer-library.polymer-project.org/3.0/docs/polyfills).
It is required in both cases.

### Addributes

Include boolean attribute `prod-env` to retrieve data from the live / production pricing database.

# Demo

Start a local http server and load pricing-data-component-demo.html in browser.

# Development

Change the .mjs file then test, build, commit.

`npm run build` will update the `lib` dir and merging that to master is a release for the node library.

The html import is deployed as part of the circle-ci job via GCS update.

### Testing

#### Live browser test

Start a local http server and then browse to pricing-data-component-test.html.
It's best to load with devtools open and cache disabled.

#### Webdriver test

Start a local http server.

Start chromedriver.

``` bash
npm install
npm run test-ci

```

--------

This project does not use WCT since it is fragile and [not well supported](https://github.com/Polymer/tools/issues/3398).
