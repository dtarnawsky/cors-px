import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatFact } from './cat-fact.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost';
  authToken = 'blar-test';

  constructor(private http: HttpClient) { }

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`
    });
  }

  getCatFacts() {
    // Cat Facts doesnt need a token but this is common use case
    return this.http.get<Array<CatFact>>(`${this.url}/facts`,
      { headers: this.headers() });
  }
}
