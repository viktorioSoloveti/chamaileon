import {
  Directive,
  Inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { chamaileonSdk } from '.';
import { API } from './tokens';

export function extractAPI({ withSDK }: SdkDirective): chamaileonSdk {
  return withSDK;
}

@Directive({
  selector: '[withSDK]',
  providers: [
    {
      provide: API,
      deps: [SdkDirective],
      useFactory: extractAPI,
    },
  ],
})
export class SdkDirective implements OnChanges {
  @Input()
  withSDK: chamaileonSdk | null = null;

  constructor(
    @Inject(TemplateRef) private readonly templateRef: TemplateRef<{}>,
    @Inject(ViewContainerRef) private readonly vcr: ViewContainerRef
  ) {}


  ngOnChanges(): void {
    if (this.withSDK) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
