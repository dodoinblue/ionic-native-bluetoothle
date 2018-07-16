import { BluetoothLe } from './BluetoothLe';
import { Observable } from 'rxjs';
import { ScanResult } from './models/BleModels';
export interface IConnectionStatus {
    name: string;
    address: string;
    status: 'connected' | 'disconnected';
}
export declare class BluetoothLeHelper {
    bluetoothle: BluetoothLe;
    constructor();
    initialize(): Promise<boolean>;
    getAdaptorInfo(): Promise<{
        name: string;
        address: string;
        isInitialized: boolean;
        isEnabled: boolean;
        isScanning: boolean;
        isDiscoverable: boolean;
    }>;
    startScan(services: string[]): Observable<ScanResult>;
    stopScan(): Promise<boolean>;
    retrieveConnected(services: string[]): Promise<{
        name: string;
        address: string;
    }[]>;
    bond(address: string): Promise<boolean>;
    unbond(address: string): Promise<boolean>;
    connect(address: string): Observable<IConnectionStatus>;
    reconnect(address: string): Promise<boolean>;
    disconnect(address: string): Promise<boolean>;
    close(address: string): Promise<boolean>;
    discover(address: string): Promise<{
        uuid: string;
        characteristics: {
            uuid: string;
            descriptors: any[];
        }[];
    }[]>;
    read(address: string, service: string, characteristic: string): Promise<Uint8Array>;
    write(address: string, service: string, characteristic: string, cmd: Uint8Array, withoutResponse: boolean): Promise<boolean>;
    subscribe(address: string, service: string, characteristic: string): Observable<Uint8Array>;
    unsubscribe(address: string, service: string, characteristic: string): Promise<boolean>;
    rssi(address: string): Promise<number>;
    mtu(address: string, mtu: number): Promise<number>;
    requestConnectionPriority(address: string, connectionPriority: 'low' | 'balanced' | 'high'): Promise<boolean>;
    isInitialized(): Promise<boolean>;
    isEnabled(): Promise<boolean>;
    isScanning(): Promise<boolean>;
    isBonded(address: string): Promise<boolean>;
    wasConnected(address: string): Promise<boolean>;
    isConnected(address: string): Promise<boolean>;
    isDiscovered(address: string): Promise<boolean>;
    hasPermission(): Promise<boolean>;
    requestPermission(): Promise<boolean>;
    isLocationEnabled(): Promise<boolean>;
    requestLocation(): Promise<boolean>;
    bytesToEncodedString(bytes: Uint8Array): string;
    encodedStringToBytes(s: string): Uint8Array;
}
