# Development Proxy Server

This is a simple web server that proxies API calls to another server. It is enabled for CORs which means it is great for development where your API server doesnt support CORs and your application will be deployed on the same domain as the API server or in a Capacitor/Cordova project where native HTTP calls are made.

Running the following will create a proxy server on `localhost` that redirects to `cat-fact.herokuapp.com`.
```bash
npx dtarnawsky/cors-px --url https://cat-fact.herokuapp.com
```
## Options

### Ports
You can change the port with:
```bash
npx dtarnawsky/cors-px -u https://cat-fact.herokuapp.com --port=6000
```

### Verbose
To verbosely log requests:
```bash
npx dtarnawsky/cors-px -u https://cat-fact.herokuapp.com --verbose
```

### Help
To get help:
```bash
npx dtarnawsky/cors-px --help
```

### Calling the Proxy
Here's an example Angular service that can get Cat Facts with `ApiService.getCatFacts`:
```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatFact } from './cat-fact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:80';
  authToken = 'blar-test';

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.authToken}`
    });
  }

  getCatFacts() {
    // Cat Facts doesnt need a token but this is common use case
    return this.http.get<Array<CatFact>>(`${this.url}/facts`,
      { headers: this.headers() });
  }
}
```