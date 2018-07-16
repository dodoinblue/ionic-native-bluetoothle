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

// creating temporary enums to avoid ts compiler warning.
// https://github.com/Microsoft/TypeScript/issues/10570
export enum InitStatus {
  enable = 'enabled',
  disable = 'disabled'
}

export enum StartScanStatus {
  start = 'scanStarted',
  result = 'scanResult'
}

export enum StopScanStatus {
  stop = 'scanStopped'
}

export enum BondStatus {
  bonded = 'bonded',
  bonding = 'bonding',
  unbonded = 'unbonded'
}

export enum UnbondStatus {
  unbonded = 'unbonded'
}

export enum ConnectStatus {
  connected = 'connected',
  disconnected = 'disconnected'
}

export enum DisconnectStatus {
  disconnected = 'disconnected'
}

export enum CloseStatus {
  closed = 'closed'
}

export enum ServiceStatus {
  services = 'services'
}

export enum CharacteristicsStatus {
  characteristics = 'characteristics'
}

export enum DescriptorsStatus {
  descriptors = 'descriptors'
}

export enum ReadStatus {
  read = 'read'
}

export enum SubscribeStatus {
  subscribed = 'subscribed',
  result = 'subscribedResult'
}

export enum UnsubscribeStatus {
  unsubscribed = 'unsubscribed',
}

export enum WriteStatus {
  written = 'written'
}
