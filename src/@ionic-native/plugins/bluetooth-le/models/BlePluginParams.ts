export interface InitParams {
  request: boolean,
  statusReceiver: boolean,
  restoreKey: string,
}

export interface ScanParams {
  // iOS
  allowDuplicates?: boolean,
  // Android
  matchNum?: number,
  callbackType?: number,
  scanMode?: number
  // Both
  services: string[]
}

export interface RetrieveConnectedParams {
  services: string[]
}

export interface AddressParams {
  address: string
}

export interface ConnectParams {
  address: string,
  autoConnect?: boolean // Android
}

export interface DiscoverParams {
  address: string,
  clearCache?: boolean // Android
}

export interface ServicesDiscoverParams {
  address: string,
  services: string[]
}

export interface CharacteristicsDiscoverParams {
  address: string,
  services: string,
  characteristics: string[]
}

export interface CharacteristicPath {
  address: string,
  service: string,
  characteristic: string
}
