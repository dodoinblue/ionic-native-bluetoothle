var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * This is a Ionic Native wrapper for cordova-plugin-bluetoothle
 */
import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
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
var BluetoothLe = (function (_super) {
    __extends(BluetoothLe, _super);
    function BluetoothLe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * Initialize Bluetooth on the device. Must be called before anything else. Observable will
       * continuously be used whenever Bluetooth is enabled or disabled & gatt server events.
       * @param params @see InitParams
       */
    BluetoothLe.prototype.initialize = function (params) {
        return;
    };
    /**
     * Android only
     * Enable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
     * Bluetooth state. A successful enable will return a status => enabled via initialize success callback.
     */
    BluetoothLe.prototype.enable = function () {
        return;
    };
    /**
     * Android only
     * Disable Bluetooth on the device. Android support only. Listen to initialize callbacks for change in
     * Bluetooth state. A successful disable will return an error => enable via initialize error callback.
     */
    BluetoothLe.prototype.disable = function () {
        return;
    };
    /**
     * Android only
     * Retrieve useful information such as the address, name, and various states
     * (initialized, enabled, scanning, discoverable).
     */
    BluetoothLe.prototype.getAdapterInfo = function () {
        return;
    };
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
    BluetoothLe.prototype.startScan = function (params) {
        return;
    };
    /**
     * Stop scan for Bluetooth LE devices. Since scanning is expensive, stop as soon as possible.
     * The app should use a timer to limit the scanning time.
     */
    BluetoothLe.prototype.stopScan = function () {
        return;
    };
    /**
     * Retrieved paired Bluetooth LE devices.
     * @param params services to look for
     */
    BluetoothLe.prototype.retrieveConnected = function (params) {
        return;
    };
    /**
     * Android only. Bond with a device. The first success callback should always return with
     * status == bonding. If the bond is created, the callback will return again with
     * status == bonded. If the bonding popup is canceled or the wrong code is entered,
     * the callback will return again with status == unbonded
     * @param params address of the device
     */
    BluetoothLe.prototype.bond = function (params) {
        return;
    };
    /**
     * Android only
     * @param params
     */
    BluetoothLe.prototype.unbond = function (params) {
        return;
    };
    /**
     * Connect to a Bluetooth LE device. The app should use a timer to limit the
     * connecting time in case connecting is never successful. Once a device is
     * connected, it may disconnect without user intervention. The original connection
     * callback will be called again and receive an object with status => disconnected.
     * @param params @see ConnectParams
     */
    BluetoothLe.prototype.connect = function (params) {
        return;
    };
    /**
     * Reconnect to a previously connected Bluetooth device.
     * The app should use a timer to limit the connecting time.
     * If a timeout occurs, the reconnection attempt should be canceled
     * using disconnect() or close().
     * @param params @see AddressParams
     */
    BluetoothLe.prototype.reconnect = function (params) {
        return;
    };
    /**
     * Disconnect from a Bluetooth LE device. It's simpler to just call close().
     * Starting with iOS 10, disconnecting before closing seems required!
     * @param params @see AddressParams
     */
    BluetoothLe.prototype.disconnect = function (params) {
        return;
    };
    /**
     * Close/dispose a Bluetooth LE device. Prior to 2.7.0, you needed to disconnect to the
     * device before closing, but this is no longer the case. Starting with iOS 10,
     * disconnecting before closing seems required!
     * @param params @see AddressParams
     */
    BluetoothLe.prototype.close = function (params) {
        return;
    };
    /**
     * Discover all the devices services, characteristics and descriptors. Doesn't need to be
     * called again after disconnecting and then reconnecting. If using iOS, you shouldn't use
     * discover and services/characteristics/descriptors on the same device.
     * @param params @see DiscoverParams
     */
    BluetoothLe.prototype.discover = function (params) {
        return;
    };
    /**
     * iOS only
     * Discover the device's services. Not providing an array of services will return
     * all services and take longer to discover. iOS support only.
     * @param params @see ServicesDiscoverParams
     */
    BluetoothLe.prototype.services = function (params) {
        return;
    };
    /**
     * iOS only
     * Discover the service's characteristics. Not providing an array of characteristics
     * will return all characteristics and take longer to discover. iOS support only.
     * @param params @see CharacteristicsDiscoverParams
     */
    BluetoothLe.prototype.characteristics = function (params) {
        return;
    };
    /**
     * iOS only
     * Discover the characteristic's descriptors. iOS support only.
     * @param params
     */
    BluetoothLe.prototype.descriptors = function (params) {
        return;
    };
    /**
     * Read a particular service's characteristic once.
     * @param params CharacteristicPath
     */
    BluetoothLe.prototype.read = function (params) {
        return;
    };
    /**
     * Subscribe to a particular service's characteristic. Once a subscription is no
     * longer needed, execute unsubscribe in a similar fashion.
     * @param params CharacteristicPath
     */
    BluetoothLe.prototype.subscribe = function (params) {
        return;
    };
    /**
     * Unsubscribe to a particular service's characteristic.
     * @param params
     */
    BluetoothLe.prototype.unsubscribe = function (params) {
        return;
    };
    /**
     * Write a particular service's characteristic.
     * Note, no callback will occur on write without response on iOS.
     */
    BluetoothLe.prototype.write = function (params) {
        return;
    };
    /**
     * This is experimental. Write Quick / Queue, use this method to quickly execute write without response commands
     * when writing more than 20 bytes at a time.
     */
    BluetoothLe.prototype.writeQ = function (params) {
        return;
    };
    BluetoothLe.prototype.rssi = function (params) {
        return;
    };
    /**
     * Android 5+ only
     * Set MTU of a connected device. Android only.
     * @param params
     */
    BluetoothLe.prototype.mtu = function (params) {
        return;
    };
    /**
     * Android 5+ only
     * @param params
     */
    BluetoothLe.prototype.requestConnectionPriority = function (params) {
        return;
    };
    BluetoothLe.prototype.isInitialized = function () {
        return;
    };
    BluetoothLe.prototype.isEnabled = function () {
        return;
    };
    BluetoothLe.prototype.isScanning = function () {
        return;
    };
    BluetoothLe.prototype.isBonded = function (params) {
        return;
    };
    BluetoothLe.prototype.wasConnected = function (params) {
        return;
    };
    BluetoothLe.prototype.isConnected = function (params) {
        return;
    };
    BluetoothLe.prototype.isDiscovered = function (params) {
        return;
    };
    /**
     * Android 6+
     */
    BluetoothLe.prototype.hasPermission = function () {
        return;
    };
    /**
     * Android 6+
     */
    BluetoothLe.prototype.requestPermission = function () {
        return;
    };
    /**
     * Android 6+
     */
    BluetoothLe.prototype.requestLocation = function () {
        return;
    };
    /**
     * Android 6+
     */
    BluetoothLe.prototype.isLocationEnabled = function () {
        return;
    };
    BluetoothLe.prototype.bytesToEncodedString = function (bytes) {
        return;
    };
    BluetoothLe.prototype.encodedStringToBytes = function (s) {
        return;
    };
    BluetoothLe.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BluetoothLe.ctorParameters = function () { return []; };
    __decorate([
        Cordova({ successIndex: 0, errorIndex: 2, observable: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "initialize", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse', sync: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BluetoothLe.prototype, "enable", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse', sync: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BluetoothLe.prototype, "disable", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "getAdapterInfo", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse', observable: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "startScan", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "stopScan", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "retrieveConnected", null);
    __decorate([
        Cordova({
            callbackOrder: 'reverse',
            observable: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "bond", null);
    __decorate([
        Cordova({
            callbackOrder: 'reverse',
            observable: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "unbond", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse', observable: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "connect", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "reconnect", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "disconnect", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "close", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "discover", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "services", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "characteristics", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "descriptors", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "read", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse', observable: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable)
    ], BluetoothLe.prototype, "subscribe", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "unsubscribe", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], BluetoothLe.prototype, "write", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], BluetoothLe.prototype, "writeQ", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "rssi", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "mtu", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "requestConnectionPriority", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isInitialized", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isEnabled", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isScanning", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isBonded", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "wasConnected", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isConnected", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isDiscovered", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "hasPermission", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "requestPermission", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "requestLocation", null);
    __decorate([
        Cordova({ callbackOrder: 'reverse' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], BluetoothLe.prototype, "isLocationEnabled", null);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "SCAN_MODE_OPPORTUNISTIC", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "SCAN_MODE_LOW_POWER", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "SCAN_MODE_BALANCED", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "SCAN_MODE_LOW_LATENCY", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "MATCH_NUM_ONE_ADVERTISEMENT", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "MATCH_NUM_FEW_ADVERTISEMENT", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "MATCH_NUM_MAX_ADVERTISEMENT", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "MATCH_MODE_AGGRESSIVE", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "MATCH_MODE_STICKY", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "CALLBACK_TYPE_ALL_MATCHES", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "CALLBACK_TYPE_FIRST_MATCH", void 0);
    __decorate([
        CordovaProperty,
        __metadata("design:type", Number)
    ], BluetoothLe.prototype, "CALLBACK_TYPE_MATCH_LOST", void 0);
    __decorate([
        Cordova({ sync: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Uint8Array]),
        __metadata("design:returntype", String)
    ], BluetoothLe.prototype, "bytesToEncodedString", null);
    __decorate([
        Cordova({ sync: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Uint8Array)
    ], BluetoothLe.prototype, "encodedStringToBytes", null);
    BluetoothLe = __decorate([
        Plugin({
            pluginName: 'BluetoothLePlugin',
            plugin: 'cordova-plugin-bluetoothle',
            pluginRef: 'bluetoothle',
            repo: 'https://github.com/randdusing/cordova-plugin-bluetoothle',
            platforms: ['Android', 'iOS']
        })
    ], BluetoothLe);
    return BluetoothLe;
}(IonicNativePlugin));
export { BluetoothLe };
//# sourceMappingURL=BluetoothLe.js.map