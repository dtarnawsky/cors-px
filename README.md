# Development Proxy Server

This is a simple web server that proxies API calls to another server. It is enabled for CORs which means it is great for development where your API server doesnt support CORs and your application will be deployed on the same domain as the API server or in a Capacitor/Cordova project where native HTTP calls are made.

Running the following will create a proxy server on `localhost` that redirects to `cat-fact.herokuapp.com`.
`npx cors-proxy --redirect https://cat-fact.herokuapp.com`