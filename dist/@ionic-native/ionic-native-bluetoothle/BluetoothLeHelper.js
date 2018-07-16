import { BluetoothLe } from './BluetoothLe';
import { Injectable } from '@angular/core';
import { take, map, filter } from 'rxjs/operators';
import { timeoutPromiseWithError } from '@dodoinblue/promiseutils';
var DEFAULT_OPERATION_TIMEOUT = 5000; // ms
var BluetoothLeHelper = (function () {
    function BluetoothLeHelper() {
        this.bluetoothle = new BluetoothLe();
    }
    BluetoothLeHelper.prototype.initialize = function () {
        return this.bluetoothle.initialize().pipe(take(1), map(function (result) { return result.status === 'enabled'; })).toPromise();
    };
    // enable (): Promise<boolean>
    // disable (): Promise<boolean>
    BluetoothLeHelper.prototype.getAdaptorInfo = function () {
        return this.bluetoothle.getAdapterInfo();
    };
    BluetoothLeHelper.prototype.startScan = function (services) {
        var scanParams = { 'services': services };
        return this.bluetoothle.startScan(scanParams).pipe(filter(function (result) { return result && result.status === 'scanResult'; }), map(function (result) {
            return {
                address: result.address,
                name: result.name,
                rssi: result.rssi,
                advertisement: result.advertisement
            };
        }));
    };
    BluetoothLeHelper.prototype.stopScan = function () {
        return this.bluetoothle.stopScan().then(function (result) { return result.status === 'scanStopped'; });
    };
    BluetoothLeHelper.prototype.retrieveConnected = function (services) {
        return this.bluetoothle.retrieveConnected({ 'services': services });
    };
    BluetoothLeHelper.prototype.bond = function (address) {
        return timeoutPromiseWithError(this.bluetoothle.bond({ 'address': address }).pipe(filter(function (result) { return result.status === 'bonded'; }), take(1)).toPromise(), DEFAULT_OPERATION_TIMEOUT);
    };
    BluetoothLeHelper.prototype.unbond = function (address) {
        return timeoutPromiseWithError(this.bluetoothle.unbond({ 'address': address }).pipe(filter(function (result) { return result.status === 'unbonded'; }), take(1)).toPromise(), DEFAULT_OPERATION_TIMEOUT);
    };
    // connect (address): Promise<Observable<IConnectionStatus>> {
    //   let connectionStatusSubject = new Subject<IConnectionStatus>()
    //   let deferred = new Deferred<Observable<IConnectionStatus>>()
    //   this.bluetoothle.connect({ 'address': address }).pipe(tap(result => console.log('===CONNECTION STATUS:' + JSON.stringify(result))))
    //     .subscribe(result => {
    //       connectionStatusSubject.next(result)
    //       if (result.status === 'connected') {
    //         deferred.resolve(connectionStatusSubject.asObservable())
    //       }
    //     })
    //   return timeoutPromiseWithError(deferred.promise, DEFAULT_OPERATION_TIMEOUT)
    // }
    BluetoothLeHelper.prototype.connect = function (address) {
        return this.bluetoothle.connect({ 'address': address });
    };
    BluetoothLeHelper.prototype.reconnect = function (address) {
        return this.bluetoothle.reconnect({ 'address': address }).then(function (result) { return result.status === 'connected'; });
    };
    BluetoothLeHelper.prototype.disconnect = function (address) {
        return this.bluetoothle.disconnect({ 'address': address }).then(function (result) { return result.status === 'disconnected'; });
    };
    BluetoothLeHelper.prototype.close = function (address) {
        return this.bluetoothle.close({ 'address': address }).then(function (result) { return result.status === 'closed'; });
    };
    BluetoothLeHelper.prototype.discover = function (address) {
        return this.bluetoothle.discover({ 'address': address, 'clearCache': true }).then(function (result) { return result.services; });
    };
    BluetoothLeHelper.prototype.read = function (address, service, characteristic) {
        var _this = this;
        return this.bluetoothle.read({
            'address': address,
            'service': service,
            'characteristic': characteristic
        }).then(function (result) { return _this.bluetoothle.encodedStringToBytes(result.value); });
    };
    BluetoothLeHelper.prototype.write = function (address, service, characteristic, cmd, withoutResponse) {
        var _this = this;
        var writeParams = {
            'address': address,
            'service': service,
            'characteristic': characteristic,
            'value': this.bluetoothle.bytesToEncodedString(cmd)
        };
        if (withoutResponse) {
            writeParams.type = 'noResponse';
        }
        return Promise.resolve().then(function () {
            _this.bluetoothle.write(writeParams);
        }).then(function (result) {
            // console.log(`write response: ${result}`)
            return true;
        });
    };
    BluetoothLeHelper.prototype.subscribe = function (address, service, characteristic) {
        var _this = this;
        return this.bluetoothle.subscribe({
            'address': address,
            'service': service,
            'characteristic': characteristic
        }).pipe(filter(function (result) { return result.status === 'subscribedResult'; }), map(function (result) { return result.value; }), map(function (b64) { return _this.bluetoothle.encodedStringToBytes(b64); }));
    };
    BluetoothLeHelper.prototype.unsubscribe = function (address, service, characteristic) {
        return this.bluetoothle.unsubscribe({
            'address': address,
            'service': service,
            'characteristic': characteristic
        }).then(function (result) { return result.status === 'unsubscribed'; });
    };
    BluetoothLeHelper.prototype.rssi = function (address) {
        return this.bluetoothle.rssi({ 'address': address }).then(function (result) { return result.rssi; });
    };
    BluetoothLeHelper.prototype.mtu = function (address, mtu) {
        return this.bluetoothle.mtu({ 'address': address, 'mtu': mtu }).then(function (result) { return result.mtu; });
    };
    BluetoothLeHelper.prototype.requestConnectionPriority = function (address, connectionPriority) {
        return this.bluetoothle.requestConnectionPriority({
            'address': address,
            'connectionPriority': connectionPriority
        }).then(function (result) { return result.status === 'connectionPriorityRequested'; });
    };
    BluetoothLeHelper.prototype.isInitialized = function () {
        return this.bluetoothle.isInitialized().then(function (result) { return result.isInitialized; });
    };
    BluetoothLeHelper.prototype.isEnabled = function () {
        return this.bluetoothle.isEnabled().then(function (result) { return result.isEnabled; });
    };
    BluetoothLeHelper.prototype.isScanning = function () {
        return this.bluetoothle.isScanning().then(function (result) { return result.isScanning; });
    };
    BluetoothLeHelper.prototype.isBonded = function (address) {
        return this.bluetoothle.isBonded({ 'address': address }).then(function (result) { return result.isBonded; });
    };
    BluetoothLeHelper.prototype.wasConnected = function (address) {
        return this.bluetoothle.wasConnected({ 'address': address }).then(function (result) { return result.wasConnected; });
    };
    BluetoothLeHelper.prototype.isConnected = function (address) {
        return this.bluetoothle.isConnected({ 'address': address }).then(function (result) { return result.isConnected; });
    };
    BluetoothLeHelper.prototype.isDiscovered = function (address) {
        return this.bluetoothle.isDiscovered({ 'address': address }).then(function (result) { return result.isDiscovered; });
    };
    BluetoothLeHelper.prototype.hasPermission = function () {
        return this.bluetoothle.hasPermission().then(function (result) { return result.hasPermission; });
    };
    BluetoothLeHelper.prototype.requestPermission = function () {
        return this.bluetoothle.requestPermission().then(function (result) { return result.requestPermission; });
    };
    BluetoothLeHelper.prototype.isLocationEnabled = function () {
        return this.bluetoothle.isLocationEnabled().then(function (result) { return result.isLocationEnabled; });
    };
    BluetoothLeHelper.prototype.requestLocation = function () {
        return this.bluetoothle.requestLocation().then(function (result) { return result.requestLocation; });
    };
    BluetoothLeHelper.prototype.bytesToEncodedString = function (bytes) {
        return this.bluetoothle.bytesToEncodedString(bytes);
    };
    BluetoothLeHelper.prototype.encodedStringToBytes = function (s) {
        return this.bluetoothle.encodedStringToBytes(s);
    };
    BluetoothLeHelper.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BluetoothLeHelper.ctorParameters = function () { return []; };
    return BluetoothLeHelper;
}());
export { BluetoothLeHelper };
//# sourceMappingURL=BluetoothLeHelper.js.map