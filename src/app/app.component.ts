import { Observable } from 'rxjs';
import { API$ } from './tokens';
import { SDK } from '.';
import { AccessToken } from './state/access.token';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  test: number = 0;
  accToken: any;

  constructor(@Inject(API$) readonly api$: Observable<SDK>) {}

  ngOnInit(): void {
    // setInterval(() => {
    //   this.test++;
    // }, 500)
  }
}
