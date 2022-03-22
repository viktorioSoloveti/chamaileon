import {
  Component,
  Input,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { API } from '../tokens';
import { SDK } from '..';

@Component({
  selector: 'sdk',
  templateUrl: './chamalion.component.html',
})
export class SDKComponent implements OnInit {
  @Input()
  accToken: string;

  @ViewChild('ref', { static: true })
  ref: ElementRef<HTMLElement>;

  constructor(@Inject(API) readonly sdk: SDK) {
    console.log(sdk);
  }

  ngOnInit() {

    // const res = this.onInitSdk();
    console.log('dsad');
  }

//   async onInitSdk() {
//     console.log('sdsd');

//     const chamaileonPlugins = await this.sdk.init({
//       mode: 'serverless',
//       accessToken: this.accToken,
//       whitelabel: {
//         locale: 'en',
//         urls: {
//           splashScreen:
//             'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html',
//           createLogoJS:
//             'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
//         },
//         colors: {
//           primary: '#2D3291',
//           secondary: '#009f4a',
//           red: '#ff5546',
//           darkBlue: '#2d3291',
//           darkGreen: '#00af6e',
//           lightGreen: '#50d791',
//           weirdGreen: '#50d791',
//           pink: '#ff91a0',
//           yellow: '#ffd23c',
//         },
//       },
//     });

//     return chamaileonPlugins;
//   }
}
