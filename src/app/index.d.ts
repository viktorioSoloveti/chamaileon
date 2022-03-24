export type chamaileonSdk = any;

declare global {
  interface Window {
    chamaileonSdk: chamaileonSdk;
    libraryObject: any;
    onSdkReady: () => void;
  }
}
