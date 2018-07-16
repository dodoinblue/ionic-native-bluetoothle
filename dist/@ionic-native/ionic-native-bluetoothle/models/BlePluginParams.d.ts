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
export declare enum InitStatus {
    enable = "enabled",
    disable = "disabled",
}
export declare enum StartScanStatus {
    start = "scanStarted",
    result = "scanResult",
}
export declare enum StopScanStatus {
    stop = "scanStopped",
}
export declare enum BondStatus {
    bonded = "bonded",
    bonding = "bonding",
    unbonded = "unbonded",
}
export declare enum UnbondStatus {
    unbonded = "unbonded",
}
export declare enum ConnectStatus {
    connected = "connected",
    disconnected = "disconnected",
}
export declare enum DisconnectStatus {
    disconnected = "disconnected",
}
export declare enum CloseStatus {
    closed = "closed",
}
export declare enum ServiceStatus {
    services = "services",
}
export declare enum CharacteristicsStatus {
    characteristics = "characteristics",
}
export declare enum DescriptorsStatus {
    descriptors = "descriptors",
}
export declare enum ReadStatus {
    read = "read",
}
export declare enum SubscribeStatus {
    subscribed = "subscribed",
    result = "subscribedResult",
}
export declare enum UnsubscribeStatus {
    unsubscribed = "unsubscribed",
}
export declare enum WriteStatus {
    written = "written",
}
