export interface InitParams {
    request: boolean;
    statusReceiver: boolean;
    restoreKey: string;
}
export interface ScanParams {
    allowDuplicates?: boolean;
    matchNum?: number;
    callbackType?: number;
    scanMode?: number;
    services: string[];
}
export interface RetrieveConnectedParams {
    services: string[];
}
export interface AddressParams {
    address: string;
}
export interface ConnectParams {
    address: string;
    autoConnect?: boolean;
}
export interface DiscoverParams {
    address: string;
    clearCache?: boolean;
}
export interface ServicesDiscoverParams {
    address: string;
    services: string[];
}
export interface CharacteristicsDiscoverParams {
    address: string;
    services: string;
    characteristics: string[];
}
export interface CharacteristicPath {
    address: string;
    service: string;
    characteristic: string;
}
