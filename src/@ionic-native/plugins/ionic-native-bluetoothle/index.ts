/**
 * This is a Ionic Native wrapper for cordova-plugin-bluetoothle
 */
import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
import { InitParams, ScanParams, RetrieveConnectedParams, AddressParams, ConnectParams, DiscoverParams, ServicesDiscoverParams, CharacteristicsDiscoverParams, CharacteristicPath } from './models/BlePluginParams'
import './mocks/BluetoothLeMock'

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
@Plugin({
  pluginName: 'BluetoothLePlugin',
  plugin: 'cordova-plugin-bluetoothle',
  pluginRef: 'bluetoothle',
  repo: 'https://github.com/randdusing/cordova-plugin-bluetoothle',
  platforms: ['Android', 'iOS']
})
@Injectable()
export class BluetoothLe extends IonicNativePlugin {

  /**
     * Initialize Bluetooth on the device. Must be called before anything else. Observable will 
     * continuously be used whenever Bluetooth is enabled or disabled & gatt server events.
     * @param params @see InitParams
     */
  @Cordova({
    callbackOrder: 'reverse',
    callbackStyle: 'object',
    observable: true
  })
  initialize(params?: InitParams): Observable<{ status: 'enabled' | 'disabled', message?: string }> {
    return
  }

  /**
   * Android only
   * Enable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
   * Bluetooth state. A successful enable will return a status => enabled via initialize success callback.
   */
  @Cordova({ callbackOrder: 'reverse', sync: true })
  enable() {
    return
  }

  /**
   * Android only
   * Disable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
   * Bluetooth state. A successful disable will return an error => enable via initialize error callback.
   */
  @Cordova({ callbackOrder: 'reverse', sync: true })
  disable() {
    return
  }

  /**
   * Android only
   * Retrieve useful information such as the address, name, and various states
   * (initialized, enabled, scanning, discoverable). 
   */
  @Cordova({ callbackOrder: 'reverse' })
  getAdapterInfo(): Promise<{
    name: string
    address: string
    isInitialized: boolean
    isEnabled: boolean
    isScanning: boolean
    isDiscoverable: boolean
  }> {
    return
  }

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
  @Cordova({ callbackOrder: 'reverse', observable: true })
  startScan(params?: ScanParams):

    Observable<{
      status: 'scanResult' | 'scanStarted',
      advertisement?: string | any,
      rssi?: number,
      name?: string,
      address?: string
    }> {
    return
  }

  /**
   * Stop scan for Bluetooth LE devices. Since scanning is expensive, stop as soon as possible. 
   * The app should use a timer to limit the scanning time.
   */
  @Cordova({ callbackOrder: 'reverse' })
  stopScan(): Promise<{ status: 'scanStopped' }> {
    return
  }

  /**
   * Retrieved paired Bluetooth LE devices.
   * @param params services to look for
   */
  @Cordova({ callbackOrder: 'reverse' })
  retrieveConnected(params?: RetrieveConnectedParams): Promise<Array<{
    name: string,
    address: string
  }>> {
    return
  }

  /**
   * Android only. Bond with a device. The first success callback should always return with 
   * status == bonding. If the bond is created, the callback will return again with 
   * status == bonded. If the bonding popup is canceled or the wrong code is entered, 
   * the callback will return again with status == unbonded
   * @param params address of the device
   */
  @Cordova({
    callbackOrder: 'reverse',
    observable: true
  })
  bond(params?: AddressParams): Observable<{
    name: string,
    address: string,
    status: 'bonded' | 'bonding' | 'unbonded'
  }> {
    return
  }

  /**
   * Android only
   * @param params 
   */
  @Cordova({
    callbackOrder: 'reverse',
    observable: true
  })
  unbond(params?: AddressParams): Observable<{
    name: string,
    address: string,
    status: 'unbonded'
  }> {
    return
  }

  /**
   * Connect to a Bluetooth LE device. The app should use a timer to limit the
   * connecting time in case connecting is never successful. Once a device is 
   * connected, it may disconnect without user intervention. The original connection 
   * callback will be called again and receive an object with status => disconnected. 
   * @param params @see ConnectParams
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  connect(params: ConnectParams): Observable<{
    name: string,
    address: string,
    status: 'connected' | 'disconnected'
  }> {
    return
  }

  /**
   * Reconnect to a previously connected Bluetooth device.
   * The app should use a timer to limit the connecting time.
   * If a timeout occurs, the reconnection attempt should be canceled
   * using disconnect() or close().
   * @param params @see AddressParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  reconnect(params: AddressParams): Promise<{
    name: string,
    address: string,
    status: 'connected' | 'disconnected'
  }> {
    return
  }

  /**
   * Disconnect from a Bluetooth LE device. It's simpler to just call close(). 
   * Starting with iOS 10, disconnecting before closing seems required!
   * @param params @see AddressParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  disconnect(params: AddressParams): Promise<{
    address: string,
    name: string
    status: 'disconnected',
  }> {
    return
  }

  /**
   * Close/dispose a Bluetooth LE device. Prior to 2.7.0, you needed to disconnect to the 
   * device before closing, but this is no longer the case. Starting with iOS 10, 
   * disconnecting before closing seems required!
   * @param params @see AddressParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  close(params: AddressParams): Promise<{
    address: string,
    name: string
    status: 'closed',
  }> {
    return
  }

  /**
   * Discover all the devices services, characteristics and descriptors. Doesn't need to be 
   * called again after disconnecting and then reconnecting. If using iOS, you shouldn't use
   * discover and services/characteristics/descriptors on the same device. 
   * @param params @see DiscoverParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  discover(params: DiscoverParams): Promise<{
    status: string,
    address: string,
    name: string,
    services: {
      uuid: string,
      characteristics: {
        uuid: string,
        descriptors: any[]
      }[]
    }[]
  }> {
    return
  }

  /**
   * iOS only
   * Discover the device's services. Not providing an array of services will return
   * all services and take longer to discover. iOS support only.
   * @param params @see ServicesDiscoverParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  services(params: ServicesDiscoverParams): Promise<{
    status: 'services',
    services: string[],
    name: string,
    address: string
  }> {
    return
  }

  /**
   * iOS only
   * Discover the service's characteristics. Not providing an array of characteristics 
   * will return all characteristics and take longer to discover. iOS support only.
   * @param params @see CharacteristicsDiscoverParams
   */
  @Cordova({ callbackOrder: 'reverse' })
  characteristics(params: CharacteristicsDiscoverParams): Promise<{
    status: 'characteristics',
    characteristics: [{
      properties: any,
      uuid: string
    }],
    name: string,
    service: string,
    address: string
  }> {
    return
  }

  /**
   * iOS only
   * Discover the characteristic's descriptors. iOS support only.
   * @param params
   */
  @Cordova({ callbackOrder: 'reverse' })
  descriptors(params: {
    address: string,
    service: string,
    characteristic: string
  }): Promise<{
    status: 'descriptors',
    descriptors: string[]
    characteristics: string,
    name: string,
    service: string,
    address: string
  }> {
    return
  }

  /**
   * Read a particular service's characteristic once.
   * @param params CharacteristicPath
   */
  @Cordova({ callbackOrder: 'reverse' })
  read(params: CharacteristicPath): Promise<{ value: string, name: string, status: 'read' } & CharacteristicPath> {
    return
  }

  /**
   * Subscribe to a particular service's characteristic. Once a subscription is no 
   * longer needed, execute unsubscribe in a similar fashion.
   * @param params CharacteristicPath
   */
  @Cordova({ callbackOrder: 'reverse', observable: true })
  subscribe(params: CharacteristicPath): Observable<{ status: 'subscribed' | 'subscribedResult', value?: string }> {
    return
  }

  /**
   * Unsubscribe to a particular service's characteristic.
   * @param params 
   */
  @Cordova({ callbackOrder: 'reverse' })
  unsubscribe(params: CharacteristicPath): Promise<{ status: 'unsubscribed', name: string } & CharacteristicPath> {
    return
  }

  /**
   * Write a particular service's characteristic.
   * Note, no callback will occur on write without response on iOS.
   */
  @Cordova({ callbackOrder: 'reverse' })
  write(params: ({
    value: string,
    type?: 'noResponse'
  } & CharacteristicPath)): Promise<{ status: 'written', value?: string } & CharacteristicPath> | void {
    return
  }

  /**
   * This is experimental. Write Quick / Queue, use this method to quickly execute write without response commands
   * when writing more than 20 bytes at a time.
   */
  @Cordova({ callbackOrder: 'reverse' })
  writeQ(params: ({
    value: string,
    type?: 'noResponse'
  } & CharacteristicPath)): Promise<{ status: 'written', value?: string } & CharacteristicPath> | void {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  rssi(params: AddressParams): Promise<{
    status: 'rssi',
    rssi: number,
    name: string,
    address: string
  }> {
    return
  }

  /**
   * Android 5+ only
   * Set MTU of a connected device. Android only.
   * @param params
   */
  @Cordova({ callbackOrder: 'reverse' })
  mtu(params: { mtu: number } & AddressParams): Promise<{
    status: 'mtu',
    mtu: number,
    name: string,
    address: string
  }> {
    return
  }

  /**
   * Android 5+ only
   * @param params 
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestConnectionPriority(params: { connectionPriority: 'low' | 'balanced' | 'high' } & AddressParams): Promise<{
    status: 'connectionPriorityRequested',
    name: string,
    address: string
  }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isInitialized(): Promise<{ isInitialized: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isEnabled(): Promise<{ isEnabled: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isScanning(): Promise<{ isScanning: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isBonded(params: AddressParams): Promise<{ isBonded: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  wasConnected(params: AddressParams): Promise<{ wasConnected: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isConnected(params: AddressParams): Promise<{ isConnected: boolean }> {
    return
  }

  @Cordova({ callbackOrder: 'reverse' })
  isDiscovered(params: AddressParams): Promise<{ isDiscovered: boolean }> {
    return
  }

  /**
   * Android 6+
   */
  @Cordova({ callbackOrder: 'reverse' })
  hasPermission(): Promise<{ hasPermission: boolean }> {
    return
  }

  /**
   * Android 6+
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestPermission(): Promise<{ requestPermission: boolean }> {
    return
  }

  /**
   * Android 6+
   */
  @Cordova({ callbackOrder: 'reverse' })
  requestLocation(): Promise<{ requestLocation: boolean }> {
    return
  }

  /**
   * Android 6+
   */
  @Cordova({ callbackOrder: 'reverse' })
  isLocationEnabled(): Promise<{ isLocationEnabled: boolean }> {
    return
  }

  @CordovaProperty
  SCAN_MODE_OPPORTUNISTIC: number
  @CordovaProperty
  SCAN_MODE_LOW_POWER: number
  @CordovaProperty
  SCAN_MODE_BALANCED: number
  @CordovaProperty
  SCAN_MODE_LOW_LATENCY: number
  @CordovaProperty
  MATCH_NUM_ONE_ADVERTISEMENT: number
  @CordovaProperty
  MATCH_NUM_FEW_ADVERTISEMENT: number
  @CordovaProperty
  MATCH_NUM_MAX_ADVERTISEMENT: number
  @CordovaProperty
  MATCH_MODE_AGGRESSIVE: number
  @CordovaProperty
  MATCH_MODE_STICKY: number
  @CordovaProperty
  CALLBACK_TYPE_ALL_MATCHES: number
  @CordovaProperty
  CALLBACK_TYPE_FIRST_MATCH: number
  @CordovaProperty
  CALLBACK_TYPE_MATCH_LOST: number

  @Cordova({ sync: true })
  bytesToEncodedString(bytes: Uint8Array): string {
    return
  }
  @Cordova({ sync: true })
  encodedStringToBytes(s: string): Uint8Array {
    return
  }
}
