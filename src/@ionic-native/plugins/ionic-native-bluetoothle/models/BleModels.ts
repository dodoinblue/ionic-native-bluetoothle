export class ScanResult {
  constructor (public address: string,
      public name: string,
      public advertisement: any,
      public rssi: number) {}
}
