import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class AccessToken {
  apiKey =  'h2dmDYW2gSS3rDgxb8bO';

  public async getAcessToken() {
    const accTokenRequest = await fetch("https://sdk-api.chamaileon.io/api/v1/tokens/generate", {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${this.apiKey}`,
      },
    });

      const accTokenResponse = await accTokenRequest.json();
      return accTokenResponse.result;
  }

}
