import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'https://fundoonotes.incubation.bridgelabz.com/api/';

  constructor(private http: HttpClient) {}

  getHeader() {
    const header = new HttpHeaders({
      Authorization: localStorage.getItem('token') || '',
    });
    return header;
  }

  getApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.get(this.baseUrl + endpoint, { headers });
  }

  postApi(
    endpoint: string,
    payload: any,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    return this.http.post(this.baseUrl + endpoint, payload, { headers });
  }

  putApi(
    endpoint: string,
    payload: any,
    headers: HttpHeaders = new HttpHeaders()
  ) {
    return this.http.put(this.baseUrl + endpoint, payload, { headers });
  }

  // deleteApi(
  //   endpoint: string,
  //   payload: any,
  //   headers: HttpHeaders = new HttpHeaders()
  // ) {
  //   return this.http.delete(this.baseUrl + endpoint, payload, { headers });
  // }
}
