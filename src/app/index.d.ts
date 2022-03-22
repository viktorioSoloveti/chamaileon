export type SDK = any;

declare global {
  interface Window {
    SDK: SDK;
    libraryObject: any;
    onSdkReady: () => void;
  }
}
