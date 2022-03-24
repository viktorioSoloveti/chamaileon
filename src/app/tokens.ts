import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject, NgZone, Injectable } from '@angular/core';
import { fromEvent, Observable, ReplaySubject, map } from 'rxjs';
import { chamaileonSdk } from '.';

export const API_URL = new InjectionToken<string>('ChamaileonSDK url', {
  factory: () => 'https://plugins.chamaileon.io/static/chamaileonSdk.js',
});

export const API$ = new InjectionToken<Observable<chamaileonSdk>>('sdk', {
  factory: () => {
    const documentRef = inject(DOCUMENT);
    const script = documentRef.createElement('script');

    script.src = inject(API_URL);
    documentRef.body.appendChild(script);

    return fromEvent(script, 'load').pipe(
      map(() => documentRef.defaultView!.chamaileonSdk)
    );
  },
});

export const API = new InjectionToken<chamaileonSdk>('ChamaileonSDK object');
