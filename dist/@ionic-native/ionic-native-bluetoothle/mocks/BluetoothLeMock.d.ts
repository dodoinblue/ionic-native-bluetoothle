import { BluetoothLe } from '../index';
import { Observable } from 'rxjs/Observable';
import { InitParams, ScanParams, RetrieveConnectedParams, AddressParams, ConnectParams, DiscoverParams, ServicesDiscoverParams, CharacteristicsDiscoverParams, CharacteristicPath } from '../models/BlePluginParams';
import { Observer } from 'rxjs/Observer';
export declare class BluetoothLeMock extends BluetoothLe {
    initObserver: Observer<any>;
    connectObserver: Observer<any>;
    initialize(params?: InitParams): Observable<{
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
    startScan(params?: ScanParams): Observable<{
        status: 'scanResult' | 'scanStarted';
        advertisement?: string | any;
        rssi?: number;
        name?: string;
        address?: string;
    }>;
    stopScan(): Promise<{
        status: 'scanStopped';
    }>;
    retrieveConnected(params?: RetrieveConnectedParams): Promise<Array<{
        name: string;
        address: string;
    }>>;
    bond(params?: AddressParams): Observable<{
        name: string;
        address: string;
        status: 'bonded' | 'bonding' | 'unbonded';
    }>;
    unbond(params?: AddressParams): Observable<{
        name: string;
        address: string;
        status: 'unbonded';
    }>;
    connect(params: ConnectParams): Observable<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    reconnect(params: AddressParams): Promise<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    disconnect(params: AddressParams): Promise<{
        address: string;
        name: string;
        status: 'disconnected';
    }>;
    close(params: AddressParams): Promise<{
        address: string;
        name: string;
        status: 'closed';
    }>;
    discover(params: DiscoverParams): Promise<{
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
    services(params: ServicesDiscoverParams): Promise<{
        status: 'services';
        services: string[];
        name: string;
        address: string;
    }>;
    characteristics(params: CharacteristicsDiscoverParams): Promise<any>;
    descriptors(params: {
        address: string;
        service: string;
        characteristic: string;
    }): Promise<any>;
    read(params: CharacteristicPath): Promise<{
        value: string;
        name: string;
        status: 'read';
    } & CharacteristicPath>;
    subscribe(params: CharacteristicPath): Observable<any>;
    unsubscribe(params: CharacteristicPath): Promise<{
        status: 'unsubscribed';
        name: string;
    } & CharacteristicPath>;
    write(params: ({
        value: string;
        type?: 'noResponse';
    } & CharacteristicPath)): Promise<{
        status: 'written';
        value?: string;
    } & CharacteristicPath> | void;
    isInitialized(): Promise<{
        isInitialized: boolean;
    }>;
    isEnabled(): Promise<{
        isEnabled: boolean;
    }>;
    isScanning(): Promise<{
        isScanning: boolean;
    }>;
    isBonded(params: AddressParams): Promise<{
        isBonded: boolean;
    }>;
    wasConnected(params: AddressParams): Promise<{
        wasConnected: boolean;
    }>;
    isConnected(params: AddressParams): Promise<{
        isConnected: boolean;
    }>;
    isDiscovered(params: AddressParams): Promise<{
        isDiscovered: boolean;
    }>;
}
