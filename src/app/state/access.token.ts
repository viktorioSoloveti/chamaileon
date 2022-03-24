import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccessToken {
  apiKey = 'h2dmDYW2gSS3rDgxb8bO';

  constructor(private http: HttpClient) {}

  public getAccessToken() {
    return this.http
      .get('https://sdk-api.chamaileon.io/api/v1/tokens/generate', {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      })
      .pipe(map((data: any) => data.result));
  }
}
