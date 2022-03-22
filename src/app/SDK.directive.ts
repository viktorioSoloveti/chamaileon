import {
  Directive,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { API } from './tokens';
import { SDK } from '.';

export function extractAPI({ withSDK }: SdkDirective): SDK {
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
  withSDK: SDK | null = null;

  constructor(
    @Inject(TemplateRef) private readonly templateRef: TemplateRef<{}>,
    @Inject(ViewContainerRef) private readonly vcr: ViewContainerRef
  ) {
    console.log('dsa');

  }


  ngOnChanges(): void {
    if (this.withSDK) {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
