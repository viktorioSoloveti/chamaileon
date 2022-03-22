import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject, NgZone, Injectable } from '@angular/core';
import { fromEvent, Observable, ReplaySubject, map } from 'rxjs';
import { SDK } from '.';

export const API_URL = new InjectionToken<string>('ChamaileonSDK url', {
  factory: () => 'https://plugins.chamaileon.io/static/chamaileonSdk.js',
});

export const API$ = new InjectionToken<Observable<SDK>>('sdk', {
  // factory: () => {
  //   const documentRef = inject(DOCUMENT);
  //   const script = documentRef.createElement('script');

  //   script.src = 'https://plugins.chamaileon.io/static/chamaileonSdk.js';
  //   documentRef.body.appendChild(script);

  //   return fromEvent(script, 'load').pipe(
  //     map(() => documentRef.defaultView!.libraryObject)
  //   );
  // },
  factory: () => {
    const documentRef = inject(DOCUMENT);
    const zone = inject(NgZone);
    const script = documentRef.createElement('script');
    const windowRef = documentRef.defaultView;
    const loaded$ = new ReplaySubject(1);

    script.src = inject(API_URL);
    documentRef.body.appendChild(script);

    windowRef!.onSdkReady = () => {
      zone.run(() => loaded$.next(windowRef!.SDK));
    };

    return loaded$;
  },
});

export const API = new InjectionToken<SDK>('ChamaileonSDK object');
