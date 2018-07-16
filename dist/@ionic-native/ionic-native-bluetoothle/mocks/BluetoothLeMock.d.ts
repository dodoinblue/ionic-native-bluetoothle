import { BluetoothLe } from '../BluetoothLe';
import { Observable } from 'rxjs/Observable';
import * as BlePluginParams from '../models/BlePluginParams';
import { Observer } from 'rxjs/Observer';
export declare class BluetoothLeMock extends BluetoothLe {
    initObserver: Observer<any>;
    connectObserver: Observer<any>;
    initialize(params?: BlePluginParams.InitParams): Observable<{
        status: 'enabled' | 'disabled';
        message?: string;
    }>;
    enable(): void;
    disable(): void;
    getAdapterInfo(): Promise<{
        name: string;
        address: string;
        isInitialized: boolean;
        isEnabled: boolean;
        isScanning: boolean;
        isDiscoverable: boolean;
    }>;
    startScan(params?: BlePluginParams.ScanParams): Observable<{
        status: 'scanResult' | 'scanStarted';
        advertisement?: string | any;
        rssi?: number;
        name?: string;
        address?: string;
    }>;
    stopScan(): Promise<{
        status: 'scanStopped';
    }>;
    retrieveConnected(params?: BlePluginParams.RetrieveConnectedParams): Promise<Array<{
        name: string;
        address: string;
    }>>;
    bond(params?: BlePluginParams.AddressParams): Observable<{
        name: string;
        address: string;
        status: 'bonded' | 'bonding' | 'unbonded';
    }>;
    unbond(params?: BlePluginParams.AddressParams): Observable<{
        name: string;
        address: string;
        status: 'unbonded';
    }>;
    connect(params: BlePluginParams.ConnectParams): Observable<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    reconnect(params: BlePluginParams.AddressParams): Promise<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    disconnect(params: BlePluginParams.AddressParams): Promise<{
        address: string;
        name: string;
        status: 'disconnected';
    }>;
    close(params: BlePluginParams.AddressParams): Promise<{
        address: string;
        name: string;
        status: 'closed';
    }>;
    discover(params: BlePluginParams.DiscoverParams): Promise<{
        status: string;
        address: string;
        name: string;
        services: {
            uuid: string;
            characteristics: {
                uuid: string;
                descriptors: any[];
            }[];
        }[];
    }>;
    services(params: BlePluginParams.ServicesDiscoverParams): Promise<{
        status: 'services';
        services: string[];
        name: string;
        address: string;
    }>;
    characteristics(params: BlePluginParams.CharacteristicsDiscoverParams): Promise<any>;
    descriptors(params: {
        address: string;
        service: string;
        characteristic: string;
    }): Promise<any>;
    read(params: BlePluginParams.CharacteristicPath): Promise<{
        value: string;
        name: string;
        status: 'read';
    } & BlePluginParams.CharacteristicPath>;
    subscribe(params: BlePluginParams.CharacteristicPath): Observable<any>;
    unsubscribe(params: BlePluginParams.CharacteristicPath): Promise<{
        status: 'unsubscribed';
        name: string;
    } & BlePluginParams.CharacteristicPath>;
    write(params: ({
        value: string;
        type?: 'noResponse';
    } & BlePluginParams.CharacteristicPath)): Promise<{
        status: 'written';
        value?: string;
    } & BlePluginParams.CharacteristicPath> | void;
    isInitialized(): Promise<{
        isInitialized: boolean;
    }>;
    isEnabled(): Promise<{
        isEnabled: boolean;
    }>;
    isScanning(): Promise<{
        isScanning: boolean;
    }>;
    isBonded(params: BlePluginParams.AddressParams): Promise<{
        isBonded: boolean;
    }>;
    wasConnected(params: BlePluginParams.AddressParams): Promise<{
        wasConnected: boolean;
    }>;
    isConnected(params: BlePluginParams.AddressParams): Promise<{
        isConnected: boolean;
    }>;
    isDiscovered(params: BlePluginParams.AddressParams): Promise<{
        isDiscovered: boolean;
    }>;
}
