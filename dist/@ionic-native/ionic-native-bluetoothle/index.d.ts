import { IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
import { InitParams, ScanParams, RetrieveConnectedParams, AddressParams, ConnectParams, DiscoverParams, ServicesDiscoverParams, CharacteristicsDiscoverParams, CharacteristicPath } from './models/BlePluginParams';
/**
 * @name BluetoothLe
 * @description
 * This is a Ionic Native wrapper for cordova-plugin-bluetoothle
 *
 * @usage
 * ```typescript
 * import { BluetoothLe } from 'ionic-native-bluetoothle'
 *
 *
 * constructor(private ble: BluetoothLe) { }
 *
 * ...
 *
 *
 * this.ble.initialize().take(1).subscribe(result => {
 *   console.log(`bluetooth status: ${result.status}`)
 * })
 *
 * ```
 */
export declare class BluetoothLe extends IonicNativePlugin {
    /**
       * Initialize Bluetooth on the device. Must be called before anything else. Observable will
       * continuously be used whenever Bluetooth is enabled or disabled & gatt server events.
       * @param params @see InitParams
       */
    initialize(params?: InitParams): Observable<{
        status: 'enabled' | 'disabled';
        message?: string;
    }>;
    /**
     * Android only
     * Enable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
     * Bluetooth state. A successful enable will return a status => enabled via initialize success callback.
     */
    enable(): void;
    /**
     * Android only
     * Disable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
     * Bluetooth state. A successful disable will return an error => enable via initialize error callback.
     */
    disable(): void;
    /**
     * Android only
     * Retrieve useful information such as the address, name, and various states
     * (initialized, enabled, scanning, discoverable).
     */
    getAdapterInfo(): Promise<{
        name: string;
        address: string;
        isInitialized: boolean;
        isEnabled: boolean;
        isScanning: boolean;
        isDiscoverable: boolean;
    }>;
    /**
     * Scan for Bluetooth LE devices. Since scanning is expensive, stop as soon as possible.
     * The Cordova app should use a timer to limit the scan interval. Also, Android uses an AND
     * operator for filtering, while iOS uses an OR operator. Android API >= 23 requires
     * ACCESS_COARSE_LOCATION permissions to find unpaired devices. Permissions can be requested
     * by using the hasPermission and requestPermission functions. Android API >= 23 also requires
     * location services to be enabled. Use isLocationEnabled to determine whether location services
     * are enabled. If not enabled, use requestLocation to prompt the location services settings page.
     * @param params @see ScanParams
     */
    startScan(params?: ScanParams): Observable<{
        status: 'scanResult' | 'scanStarted';
        advertisement?: string | any;
        rssi?: number;
        name?: string;
        address?: string;
    }>;
    /**
     * Stop scan for Bluetooth LE devices. Since scanning is expensive, stop as soon as possible.
     * The app should use a timer to limit the scanning time.
     */
    stopScan(): Promise<{
        status: 'scanStopped';
    }>;
    /**
     * Retrieved paired Bluetooth LE devices.
     * @param params services to look for
     */
    retrieveConnected(params?: RetrieveConnectedParams): Promise<Array<{
        name: string;
        address: string;
    }>>;
    /**
     * Android only. Bond with a device. The first success callback should always return with
     * status == bonding. If the bond is created, the callback will return again with
     * status == bonded. If the bonding popup is canceled or the wrong code is entered,
     * the callback will return again with status == unbonded
     * @param params address of the device
     */
    bond(params?: AddressParams): Observable<{
        name: string;
        address: string;
        status: 'bonded' | 'bonding' | 'unbonded';
    }>;
    /**
     * Android only
     * @param params
     */
    unbond(params?: AddressParams): Observable<{
        name: string;
        address: string;
        status: 'unbonded';
    }>;
    /**
     * Connect to a Bluetooth LE device. The app should use a timer to limit the
     * connecting time in case connecting is never successful. Once a device is
     * connected, it may disconnect without user intervention. The original connection
     * callback will be called again and receive an object with status => disconnected.
     * @param params @see ConnectParams
     */
    connect(params: ConnectParams): Observable<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    /**
     * Reconnect to a previously connected Bluetooth device.
     * The app should use a timer to limit the connecting time.
     * If a timeout occurs, the reconnection attempt should be canceled
     * using disconnect() or close().
     * @param params @see AddressParams
     */
    reconnect(params: AddressParams): Promise<{
        name: string;
        address: string;
        status: 'connected' | 'disconnected';
    }>;
    /**
     * Disconnect from a Bluetooth LE device. It's simpler to just call close().
     * Starting with iOS 10, disconnecting before closing seems required!
     * @param params @see AddressParams
     */
    disconnect(params: AddressParams): Promise<{
        address: string;
        name: string;
        status: 'disconnected';
    }>;
    /**
     * Close/dispose a Bluetooth LE device. Prior to 2.7.0, you needed to disconnect to the
     * device before closing, but this is no longer the case. Starting with iOS 10,
     * disconnecting before closing seems required!
     * @param params @see AddressParams
     */
    close(params: AddressParams): Promise<{
        address: string;
        name: string;
        status: 'closed';
    }>;
    /**
     * Discover all the devices services, characteristics and descriptors. Doesn't need to be
     * called again after disconnecting and then reconnecting. If using iOS, you shouldn't use
     * discover and services/characteristics/descriptors on the same device.
     * @param params @see DiscoverParams
     */
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
    /**
     * iOS only
     * Discover the device's services. Not providing an array of services will return
     * all services and take longer to discover. iOS support only.
     * @param params @see ServicesDiscoverParams
     */
    services(params: ServicesDiscoverParams): Promise<{
        status: 'services';
        services: string[];
        name: string;
        address: string;
    }>;
    /**
     * iOS only
     * Discover the service's characteristics. Not providing an array of characteristics
     * will return all characteristics and take longer to discover. iOS support only.
     * @param params @see CharacteristicsDiscoverParams
     */
    characteristics(params: CharacteristicsDiscoverParams): Promise<{
        status: 'characteristics';
        characteristics: [{
            properties: any;
            uuid: string;
        }];
        name: string;
        service: string;
        address: string;
    }>;
    /**
     * iOS only
     * Discover the characteristic's descriptors. iOS support only.
     * @param params
     */
    descriptors(params: {
        address: string;
        service: string;
        characteristic: string;
    }): Promise<{
        status: 'descriptors';
        descriptors: string[];
        characteristics: string;
        name: string;
        service: string;
        address: string;
    }>;
    /**
     * Read a particular service's characteristic once.
     * @param params CharacteristicPath
     */
    read(params: CharacteristicPath): Promise<{
        value: string;
        name: string;
        status: 'read';
    } & CharacteristicPath>;
    /**
     * Subscribe to a particular service's characteristic. Once a subscription is no
     * longer needed, execute unsubscribe in a similar fashion.
     * @param params CharacteristicPath
     */
    subscribe(params: CharacteristicPath): Observable<{
        status: 'subscribed' | 'subscribedResult';
        value: string;
    }>;
    /**
     * Unsubscribe to a particular service's characteristic.
     * @param params
     */
    unsubscribe(params: CharacteristicPath): Promise<{
        status: 'unsubscribed';
        name: string;
    } & CharacteristicPath>;
    /**
     * Write a particular service's characteristic.
     * Note, no callback will occur on write without response on iOS.
     */
    write(params: ({
        value: string;
        type?: 'noResponse';
    } & CharacteristicPath)): Promise<{
        status: 'written';
        value?: string;
    } & CharacteristicPath> | void;
    /**
     * This is experimental. Write Quick / Queue, use this method to quickly execute write without response commands
     * when writing more than 20 bytes at a time.
     */
    writeQ(params: ({
        value: string;
        type?: 'noResponse';
    } & CharacteristicPath)): Promise<{
        status: 'written';
        value?: string;
    } & CharacteristicPath> | void;
    rssi(params: AddressParams): Promise<{
        status: 'rssi';
        rssi: number;
        name: string;
        address: string;
    }>;
    /**
     * Android 5+ only
     * Set MTU of a connected device. Android only.
     * @param params
     */
    mtu(params: {
        mtu: number;
    } & AddressParams): Promise<{
        status: 'mtu';
        mtu: number;
        name: string;
        address: string;
    }>;
    /**
     * Android 5+ only
     * @param params
     */
    requestConnectionPriority(params: {
        connectionPriority: 'low' | 'balanced' | 'high';
    } & AddressParams): Promise<{
        status: 'connectionPriorityRequested';
        name: string;
        address: string;
    }>;
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
    /**
     * Android 6+
     */
    hasPermission(): Promise<{
        hasPermission: boolean;
    }>;
    /**
     * Android 6+
     */
    requestPermission(): Promise<{
        requestPermission: boolean;
    }>;
    /**
     * Android 6+
     */
    requestLocation(): Promise<{
        requestLocation: boolean;
    }>;
    /**
     * Android 6+
     */
    isLocationEnabled(): Promise<{
        isLocationEnabled: boolean;
    }>;
    SCAN_MODE_OPPORTUNISTIC: number;
    SCAN_MODE_LOW_POWER: number;
    SCAN_MODE_BALANCED: number;
    SCAN_MODE_LOW_LATENCY: number;
    MATCH_NUM_ONE_ADVERTISEMENT: number;
    MATCH_NUM_FEW_ADVERTISEMENT: number;
    MATCH_NUM_MAX_ADVERTISEMENT: number;
    MATCH_MODE_AGGRESSIVE: number;
    MATCH_MODE_STICKY: number;
    CALLBACK_TYPE_ALL_MATCHES: number;
    CALLBACK_TYPE_FIRST_MATCH: number;
    CALLBACK_TYPE_MATCH_LOST: number;
    bytesToEncodedString(bytes: Uint8Array): string;
    encodedStringToBytes(s: string): Uint8Array;
}
