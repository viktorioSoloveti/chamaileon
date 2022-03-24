import { Observable } from 'rxjs';
import { API$ } from './tokens';
import { AccessToken } from './state/access.token';
import { Component, Inject, OnInit } from '@angular/core';
import { chamaileonSdk } from '.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  test: number = 0;
  accToken$: any;

  constructor(
    private accessToken: AccessToken,
    @Inject(API$) readonly api$: Observable<chamaileonSdk>
  ) {
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.test++;
    // }, 500)
  }
}
