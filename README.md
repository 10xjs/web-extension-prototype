# web-extension-prototype

This is a proof-of-concept for a modular sensu web-ui React app with both core
and enterprise edition builds. 

This repo's structure represents the `sensu-enterprise-go` repo, with the `sensu-go` repo in the `vendor` directory.

The app is architected allowing for modular extension. Script bundles loaded at runtime in the browser can inject additional views or other functionalty into the app. To enable strict intercommunication between bundles and to avoid duplicated code in multple bundles, the core app build creates a library bundle containing shared vendor code and a shared runtime. The core app bundle and the enterprise extensions reference the library bundle build at build-time to link to its contents. 

## Running core web-ui

Build the `sensu-go` core web-ui client and library.

```sh
cd PROJECT_ROOT/vendor/github.com/sensu/sensu-go/dashboard
npm install
npm run build
```

Run the web server and visit the app in the browser.

```sh
npm start
open http://localhost:8080
```

## Running enterprise web-ui

Build the `sensu-go` core web-ui client and library.

```sh
cd PROJECT_ROOT/vendor/github.com/sensu/sensu-go/dashboard
npm install
npm run build
```

Return to the `/dashboard` directory and build the enterprise dashboard extensions.

```sh
cd PROJECT_ROOT/dashboard
npm install
npm run build
```

Run the web server and visit the app in the browser.

```sh
npm start
open http://localhost:8080
```

## TODO
- [ ] hot code reloading (`webpack-dev-middleware` & `react-hot-loader`)
- [ ] flow-runtime (to validate extension manifest)
- [ ] define extension manifest schema
- [ ] does this extension pattern integrate with public web-components based extensions? i.e. same manifest format?
