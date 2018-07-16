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
import { BluetoothLe } from '../BluetoothLe';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators';
import * as BlePluginParams from '../models/BlePluginParams';
var BluetoothLeMock = (function (_super) {
    __extends(BluetoothLeMock, _super);
    function BluetoothLeMock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BluetoothLeMock.prototype.initialize = function (params) {
        return Observable.create(function (observer) {
            this.initObserver = observer;
            this.initObserver.next({ status: BlePluginParams.InitStatus.enable });
        });
    };
    BluetoothLeMock.prototype.enable = function () {
        if (this.initObserver) {
            this.initObserver.next({ status: BlePluginParams.InitStatus.enable });
        }
    };
    BluetoothLeMock.prototype.disable = function () {
        if (this.initObserver) {
            this.initObserver.next({ status: BlePluginParams.InitStatus.disable });
        }
    };
    BluetoothLeMock.prototype.getAdapterInfo = function () {
        return Promise.resolve({
            name: 'MockAdapter',
            address: '04:0b:13:54:5f:60',
            isInitialized: true,
            isEnabled: true,
            isScanning: false,
            isDiscoverable: false
        });
    };
    BluetoothLeMock.prototype.startScan = function (params) {
        var resp = [
            { status: BlePluginParams.StartScanStatus.start },
            {
                'address': 'C6:D5:E9:DF:CE:EE',
                'name': 'SLICE-041Q',
                'rssi': -80,
                'advertisement': 'AgEEDv+JATYwUDAwMDQxUUFJCwlTTElDRS0wNDFRAwINGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                'status': BlePluginParams.StartScanStatus.result
            },
            {
                'address': '2A:12:AA:D3:D2:C5',
                'name': null,
                'rssi': -92,
                'advertisement': 'AgEbC/9MAAkGAxusGRmSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                'status': BlePluginParams.StartScanStatus.result
            },
            {
                'address': 'E7:85:C7:2D:F8:AF',
                'name': 'SLICE-16LQ',
                'rssi': -89, 'advertisement': 'AgEEDv+JATYwUDAwMTZMUUxICwlTTElDRS0xNkxRAwINGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                'status': BlePluginParams.StartScanStatus.result
            },
            {
                'address': 'C6:D7:C9:0F:72:52',
                'name': 'LINK2-SJR2',
                'rssi': -78,
                'advertisement': 'AgEED/+JATYxUEo2U0pSMklIBQsJTElOSzItU0pSMgMCDRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
                'status': BlePluginParams.StartScanStatus.result
            }
        ];
        return interval(1000).pipe(map(function (val) {
            if (val < resp.length) {
                return resp[val];
            }
        }));
    };
    BluetoothLeMock.prototype.stopScan = function () {
        return Promise.resolve({
            status: BlePluginParams.StopScanStatus.stop
        });
    };
    BluetoothLeMock.prototype.retrieveConnected = function (params) {
        return Promise.resolve([
            {
                'address': 'C6:D7:C9:0F:72:52',
                'name': 'MOCK-040B'
            },
            {
                'address': 'C6:D7:C9:0F:72:52',
                'name': 'MOCK-1354'
            }
        ]);
    };
    BluetoothLeMock.prototype.bond = function (params) {
        var resp = [
            { name: 'Mock-Dev0', address: params.address, status: BlePluginParams.BondStatus.bonding },
            { name: 'Mock-Dev0', address: params.address, status: BlePluginParams.BondStatus.bonded }
        ];
        return interval(2000).pipe(map(function (val) {
            if (val < resp.length) {
                return resp[val];
            }
        }));
    };
    BluetoothLeMock.prototype.unbond = function (params) {
        return of({
            name: 'Mock-Dev0',
            address: params.address,
            status: BlePluginParams.UnbondStatus.unbonded
        });
    };
    BluetoothLeMock.prototype.connect = function (params) {
        return Observable.create(function (observer) {
            this.connectObserver = observer;
            this.connectObserver.next({
                name: 'MOCK-Dev0',
                address: params.address,
                status: BlePluginParams.ConnectStatus.connected
            });
        });
    };
    BluetoothLeMock.prototype.reconnect = function (params) {
        if (this.connectObserver) {
            this.connectObserver.next({
                name: 'MOCK-Dev0',
                address: params.address,
                status: BlePluginParams.ConnectStatus.connected
            });
        }
        return Promise.resolve({
            name: 'MOCK-Dev0',
            address: params.address,
            status: BlePluginParams.ConnectStatus.connected
        });
    };
    BluetoothLeMock.prototype.disconnect = function (params) {
        if (this.connectObserver) {
            this.connectObserver.next({
                name: 'MOCK-Dev0',
                address: params.address,
                status: BlePluginParams.DisconnectStatus.disconnected
            });
        }
        return Promise.resolve({
            name: 'MOCK-Dev0',
            address: params.address,
            status: BlePluginParams.DisconnectStatus.disconnected
        });
    };
    BluetoothLeMock.prototype.close = function (params) {
        return Promise.resolve({
            name: 'MOCK-Dev0',
            address: params.address,
            status: BlePluginParams.CloseStatus.closed
        });
    };
    BluetoothLeMock.prototype.discover = function (params) {
        return Promise.resolve({
            'address': params.address,
            'status': 'discovered',
            'services': [
                {
                    'characteristics': [
                        {
                            'descriptors': [],
                            'uuid': '2a00',
                            'properties': {
                                'write': true,
                                'writeWithoutResponse': true,
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a01',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a02',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a03',
                            'properties': {
                                'write': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a04',
                            'properties': {
                                'read': true
                            }
                        }
                    ],
                    'uuid': '1800' // [Generic Access](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.generic_access.xml)
                },
                {
                    'characteristics': [
                        {
                            'descriptors': [
                                {
                                    'uuid': '2902'
                                }
                            ],
                            'uuid': '2a05',
                            'properties': {
                                'indicate': true
                            }
                        }
                    ],
                    'uuid': '1801' // [Generic Attribute](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.generic_attribute.xml)
                },
                {
                    'characteristics': [
                        {
                            'descriptors': [
                                {
                                    'uuid': '2902'
                                }
                            ],
                            'uuid': '2a37',
                            'properties': {
                                'notify': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a38',
                            'properties': {
                                'read': true
                            }
                        }
                    ],
                    'uuid': '180d' // [Heart Rate](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.heart_rate.xml)
                },
                {
                    'characteristics': [
                        {
                            'descriptors': [],
                            'uuid': '2a23',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a24',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a25',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a26',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a27',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a28',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [],
                            'uuid': '2a29',
                            'properties': {
                                'read': true
                            }
                        }
                    ],
                    'uuid': '180a' // [Device Information](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.device_information.xml)
                },
                {
                    'characteristics': [
                        {
                            'descriptors': [],
                            'uuid': '2a19',
                            'properties': {
                                'read': true
                            }
                        }
                    ],
                    'uuid': '180f' // [Battery Service](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.battery_service.xml)
                },
                {
                    'characteristics': [
                        {
                            'descriptors': [],
                            'uuid': '6217ff4c-c8ec-b1fb-1380-3ad986708e2d',
                            'properties': {
                                'read': true
                            }
                        },
                        {
                            'descriptors': [
                                {
                                    'uuid': '2902'
                                }
                            ],
                            'uuid': '6217ff4d-91bb-91d0-7e2a-7cd3bda8a1f3',
                            'properties': {
                                'write': true,
                                'indicate': true
                            }
                        }
                    ],
                    'uuid': '6217ff4b-fb31-1140-ad5a-a45545d7ecf3'
                }
            ],
            'name': 'MOCK-Dev0'
        });
    };
    BluetoothLeMock.prototype.services = function (params) {
        return Promise.resolve({
            'status': BlePluginParams.ServiceStatus.services,
            'services': [
                '180d',
                '180a',
                '180f',
                '6217ff4b-fb31-1140-ad5a-a45545d7ecf3'
            ],
            'name': 'Mock-Dev0',
            'address': params.address
        });
    };
    BluetoothLeMock.prototype.characteristics = function (params) {
        return Promise.resolve({
            'status': BlePluginParams.CharacteristicsStatus.characteristics,
            'characteristics': [
                {
                    'properties': {
                        'notify': true
                    },
                    'uuid': '2a37'
                },
                {
                    'properties': {
                        'read': true
                    },
                    'uuid': '2a38'
                }
            ],
            'name': 'Mock-Dev0',
            'service': '180d',
            'address': params.address
        });
    };
    BluetoothLeMock.prototype.descriptors = function (params) {
        return Promise.resolve({
            'status': BlePluginParams.DescriptorsStatus.descriptors,
            'descriptors': [
                '2902'
            ],
            'characteristic': params.characteristic,
            'name': 'Mock-Dev0',
            'service': params.characteristic,
            'address': params.address
        });
    };
    BluetoothLeMock.prototype.read = function (params) {
        return Promise.resolve({
            address: params.address,
            service: params.service,
            characteristic: params.characteristic,
            value: '',
            name: 'MOCK-Dev0',
            status: BlePluginParams.ReadStatus.read
        });
    };
    BluetoothLeMock.prototype.subscribe = function (params) {
        var resp = [
            {
                'status': BlePluginParams.SubscribeStatus.subscribed,
                'characteristic': params.characteristic,
                'name': 'Mock-Dev0',
                'service': params.service,
                'address': params.address
            },
            {
                'status': BlePluginParams.SubscribeStatus.result,
                'value': 'U3Vic2NyaWJlIEhlbGxvIFdvcmxk',
                'characteristic': params.characteristic,
                'name': 'Mock-Dev0',
                'service': params.service,
                'address': params.address
            }
        ];
        return interval(1000).pipe(map(function (val) {
            if (val < resp.length) {
                return resp[val];
            }
        }));
    };
    BluetoothLeMock.prototype.unsubscribe = function (params) {
        return Promise.resolve({
            'status': BlePluginParams.UnsubscribeStatus.unsubscribed,
            'characteristic': params.characteristic,
            'name': 'Mock-Dev0',
            'service': params.service,
            'address': params.address
        });
    };
    BluetoothLeMock.prototype.write = function (params) {
        return Promise.resolve({
            'status': BlePluginParams.WriteStatus.written,
            'service': params.service,
            'characteristic': params.characteristic,
            'value': 'V3JpdGUgSGVsbG8gV29ybGQ=',
            'address': params.address
        });
    };
    BluetoothLeMock.prototype.isInitialized = function () {
        return Promise.resolve({ isInitialized: true });
    };
    BluetoothLeMock.prototype.isEnabled = function () {
        return Promise.resolve({ isEnabled: true });
    };
    BluetoothLeMock.prototype.isScanning = function () {
        return Promise.resolve({ isScanning: false });
    };
    BluetoothLeMock.prototype.isBonded = function (params) {
        return Promise.resolve({ isBonded: true });
    };
    BluetoothLeMock.prototype.wasConnected = function (params) {
        return Promise.resolve({ wasConnected: true });
    };
    BluetoothLeMock.prototype.isConnected = function (params) {
        return Promise.resolve({ isConnected: true });
    };
    BluetoothLeMock.prototype.isDiscovered = function (params) {
        return Promise.resolve({ isDiscovered: true });
    };
    return BluetoothLeMock;
}(BluetoothLe));
export { BluetoothLeMock };
//# sourceMappingURL=BluetoothLeMock.js.map