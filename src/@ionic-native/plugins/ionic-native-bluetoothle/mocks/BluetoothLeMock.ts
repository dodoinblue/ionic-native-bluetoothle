import { BluetoothLe } from '../BluetoothLe'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { interval } from 'rxjs/observable/interval'
import { map } from 'rxjs/operators'
import * as BlePluginParams from '../models/BlePluginParams'
import { Observer } from 'rxjs/Observer';

export class BluetoothLeMock extends BluetoothLe {

  initObserver: Observer<any>
  connectObserver: Observer<any>

  initialize(params?: BlePluginParams.InitParams): Observable<{
    status: 'enabled' | 'disabled';
    message?: string;
  }> {
    return Observable.create(function (observer: Observer<any>) {
      this.initObserver = observer
      this.initObserver.next({ status: BlePluginParams.InitStatus.enable })
    });
  }

  enable() {
    if (this.initObserver) {
      this.initObserver.next({ status: BlePluginParams.InitStatus.enable })
    }
  }

  disable() {
    if (this.initObserver) {
      this.initObserver.next({ status: BlePluginParams.InitStatus.disable })
    }
  }

  getAdapterInfo(): Promise<{
    name: string;
    address: string;
    isInitialized: boolean;
    isEnabled: boolean;
    isScanning: boolean;
    isDiscoverable: boolean;
  }> {
    return Promise.resolve({
      name: 'MockAdapter',
      address: '04:0b:13:54:5f:60',
      isInitialized: true,
      isEnabled: true,
      isScanning: false,
      isDiscoverable: false
    })
  }

  startScan(params?: BlePluginParams.ScanParams): Observable<{
    status: 'scanResult' | 'scanStarted';
    advertisement?: string | any;
    rssi?: number;
    name?: string;
    address?: string;
  }> {
    let resp = [
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
    ]
    return interval(1000).pipe(map(val => {
      if (val < resp.length) {
        return resp[val]
      }
    }))
  }

  stopScan(): Promise<{
    status: 'scanStopped';
  }> {
    return Promise.resolve({
      status: BlePluginParams.StopScanStatus.stop
    })
  }

  retrieveConnected(params?: BlePluginParams.RetrieveConnectedParams): Promise<Array<{
    name: string;
    address: string;
  }>> {
    return Promise.resolve([
      {
        'address': 'C6:D7:C9:0F:72:52',
        'name': 'MOCK-040B'
      },
      {
        'address': 'C6:D7:C9:0F:72:52',
        'name': 'MOCK-1354'
      }
    ])
  }

  bond(params?: BlePluginParams.AddressParams): Observable<{
    name: string;
    address: string;
    status: 'bonded' | 'bonding' | 'unbonded';
  }> {
    let resp = [
      { name: 'Mock-Dev0', address: params.address, status: BlePluginParams.BondStatus.bonding },
      { name: 'Mock-Dev0', address: params.address, status: BlePluginParams.BondStatus.bonded }
    ]
    return interval(2000).pipe(map(val => {
      if (val < resp.length) {
        return resp[val]
      }
    }))
  }

  unbond(params?: BlePluginParams.AddressParams): Observable<{
    name: string;
    address: string;
    status: 'unbonded';
  }> {
    return of({
      name: 'Mock-Dev0',
      address: params.address,
      status: BlePluginParams.UnbondStatus.unbonded
    })
  }

  connect(params: BlePluginParams.ConnectParams): Observable<{
    name: string;
    address: string;
    status: 'connected' | 'disconnected';
  }> {
    return Observable.create(function (observer: Observer<any>) {
      this.connectObserver = observer
      this.connectObserver.next({
        name: 'MOCK-Dev0',
        address: params.address,
        status: BlePluginParams.ConnectStatus.connected
      })
    })
  }

  reconnect(params: BlePluginParams.AddressParams): Promise<{
    name: string;
    address: string;
    status: 'connected' | 'disconnected';
  }> {
    if (this.connectObserver) {
      this.connectObserver.next({
        name: 'MOCK-Dev0',
        address: params.address,
        status: BlePluginParams.ConnectStatus.connected
      })
    }
    return Promise.resolve({
      name: 'MOCK-Dev0',
      address: params.address,
      status: BlePluginParams.ConnectStatus.connected
    })
  }

  disconnect(params: BlePluginParams.AddressParams): Promise<{
    address: string;
    name: string;
    status: 'disconnected';
  }> {
    if (this.connectObserver) {
      this.connectObserver.next({
        name: 'MOCK-Dev0',
        address: params.address,
        status: BlePluginParams.DisconnectStatus.disconnected
      })
    }
    return Promise.resolve({
      name: 'MOCK-Dev0',
      address: params.address,
      status: BlePluginParams.DisconnectStatus.disconnected
    })
  }

  close(params: BlePluginParams.AddressParams): Promise<{
    address: string;
    name: string;
    status: 'closed';
  }> {
    return Promise.resolve({
      name: 'MOCK-Dev0',
      address: params.address,
      status: BlePluginParams.CloseStatus.closed
    })
  }

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
  }> {
    return Promise.resolve({
      'address': params.address,
      'status': 'discovered',
      'services': [
        {
          'characteristics': [
            {
              'descriptors': [

              ],
              'uuid': '2a00', // [Device Name](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gap.device_name.xml)
              'properties': {
                'write': true,
                'writeWithoutResponse': true,
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a01', // [Appearance](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gap.appearance.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a02', // [Peripheral Privacy Flag](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gap.peripheral_privacy_flag.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a03', // [Reconnection Address](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gap.reconnection_address.xml)
              'properties': {
                'write': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a04', // [Pheripheral Preferred Connection Parameters](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gap.peripheral_preferred_connection_parameters.xml)
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
              'uuid': '2a05', // [Service Changed](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.gatt.service_changed.xml)
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
              'uuid': '2a37', // [Heart Rate Measurement](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_measurement.xml)
              'properties': {
                'notify': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a38', // [Body Sensor Location](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.body_sensor_location.xml)
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
              'descriptors': [

              ],
              'uuid': '2a23', // [System ID](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.system_id.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a24', // [Model Number String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.model_number_string.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a25', // [Serial Number String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.serial_number_string.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a26', // [Firmware Revision String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.firmware_revision_string.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a27', // [hardware Revision String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.hardware_revision_string.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a28', // [Software Revision String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.software_revision_string.xml)
              'properties': {
                'read': true
              }
            },
            {
              'descriptors': [

              ],
              'uuid': '2a29', // [Manufacturer Name String](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.manufacturer_name_string.xml)
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
              'descriptors': [

              ],
              'uuid': '2a19', // [Battery Level](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml)
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
              'descriptors': [

              ],
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
    })
  }

  services(params: BlePluginParams.ServicesDiscoverParams): Promise<{
    status: 'services';
    services: string[];
    name: string;
    address: string;
  }> {
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
    })
  }

  characteristics(params: BlePluginParams.CharacteristicsDiscoverParams): Promise<any> {
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
    })
  }

  descriptors(params: {
    address: string;
    service: string;
    characteristic: string;
  }): Promise<any> {
    return Promise.resolve({
      'status': BlePluginParams.DescriptorsStatus.descriptors,
      'descriptors': [
        '2902'
      ],
      'characteristic': params.characteristic,
      'name': 'Mock-Dev0',
      'service': params.characteristic,
      'address': params.address
    })
  }

  read(params: BlePluginParams.CharacteristicPath): Promise<{
    value: string;
    name: string;
    status: 'read';
  } & BlePluginParams.CharacteristicPath> {
    return Promise.resolve({
      address: params.address,
      service: params.service,
      characteristic: params.characteristic,
      value: '',
      name: 'MOCK-Dev0',
      status: BlePluginParams.ReadStatus.read
    })
  }

  subscribe(params: BlePluginParams.CharacteristicPath): Observable<any> {
    let resp = [
      {
        'status': BlePluginParams.SubscribeStatus.subscribed,
        'characteristic': params.characteristic,
        'name': 'Mock-Dev0',
        'service': params.service,
        'address': params.address
      },
      {
        'status': BlePluginParams.SubscribeStatus.result,
        'value': 'U3Vic2NyaWJlIEhlbGxvIFdvcmxk', // Subscribe Hello World
        'characteristic': params.characteristic,
        'name': 'Mock-Dev0',
        'service': params.service,
        'address': params.address
      }
    ]
    return interval(1000).pipe(map(val => {
      if (val < resp.length) {
        return resp[val]
      }
    }))
  }

  unsubscribe(params: BlePluginParams.CharacteristicPath): Promise<{
    status: 'unsubscribed';
    name: string;
  } & BlePluginParams.CharacteristicPath> {
    return Promise.resolve({
      'status': BlePluginParams.UnsubscribeStatus.unsubscribed,
      'characteristic': params.characteristic,
      'name': 'Mock-Dev0',
      'service': params.service,
      'address': params.address
    })
  }

  write(params: ({
    value: string;
    type?: 'noResponse';
  } & BlePluginParams.CharacteristicPath)): Promise<{
    status: 'written';
    value?: string;
  } & BlePluginParams.CharacteristicPath> | void {
    return Promise.resolve({
      'status': BlePluginParams.WriteStatus.written,
      'service': params.service,
      'characteristic': params.characteristic,
      'value': 'V3JpdGUgSGVsbG8gV29ybGQ=', // Write Hello World
      'address': params.address
    })
  }

  isInitialized(): Promise<{
    isInitialized: boolean;
  }> {
    return Promise.resolve({ isInitialized: true })
  }
  isEnabled(): Promise<{
    isEnabled: boolean;
  }> {
    return Promise.resolve({ isEnabled: true })
  }
  isScanning(): Promise<{
    isScanning: boolean;
  }> {
    return Promise.resolve({ isScanning: false })
  }
  isBonded(params: BlePluginParams.AddressParams): Promise<{
    isBonded: boolean;
  }> {
    return Promise.resolve({ isBonded: true })
  }
  wasConnected(params: BlePluginParams.AddressParams): Promise<{
    wasConnected: boolean;
  }> {
    return Promise.resolve({ wasConnected: true })
  }
  isConnected(params: BlePluginParams.AddressParams): Promise<{
    isConnected: boolean;
  }> {
    return Promise.resolve({ isConnected: true })
  }
  isDiscovered(params: BlePluginParams.AddressParams): Promise<{
    isDiscovered: boolean;
  }> {
    return Promise.resolve({ isDiscovered: true })
  }
}
