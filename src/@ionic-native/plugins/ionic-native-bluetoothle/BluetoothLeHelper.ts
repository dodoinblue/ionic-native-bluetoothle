import { BluetoothLe } from './BluetoothLe'
import { Injectable } from '@angular/core'
import { take, map, filter } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ScanResult } from './models/BleModels'
import { timeoutPromiseWithError } from '@dodoinblue/promiseutils'

const DEFAULT_OPERATION_TIMEOUT = 5000 // ms
export interface IConnectionStatus {
  name: string
  address: string
  status: 'connected' | 'disconnected'
}

@Injectable()
export class BluetoothLeHelper {

  bluetoothle: BluetoothLe
  constructor () {
    this.bluetoothle = new BluetoothLe()
  }

  initialize (): Promise<boolean> {
    return this.bluetoothle.initialize().pipe(
      take(1),
      map(result => result.status === 'enabled')
    ).toPromise()
  }

  // enable (): Promise<boolean>
  // disable (): Promise<boolean>

  getAdaptorInfo () {
    return this.bluetoothle.getAdapterInfo()
  }

  startScan (services: string[]): Observable<ScanResult> {
    let scanParams = { 'services': services }
    return this.bluetoothle.startScan(scanParams).pipe(
      filter(result => result && result.status === 'scanResult'),
      map(result => {
        return {
          address: result.address,
          name: result.name,
          rssi: result.rssi,
          advertisement: result.advertisement
        }
      })
    )
  }

  stopScan (): Promise<boolean> {
    return this.bluetoothle.stopScan().then(result => result.status === 'scanStopped')
  }

  retrieveConnected (services: string[]) {
    return this.bluetoothle.retrieveConnected({ 'services': services })
  }

  bond (address: string): Promise<boolean> {
    return timeoutPromiseWithError(this.bluetoothle.bond({ 'address': address }).pipe(
      filter(result => result.status === 'bonded'),
      take(1)
    ).toPromise(), DEFAULT_OPERATION_TIMEOUT)
  }

  unbond (address: string): Promise<boolean> {
    return timeoutPromiseWithError(this.bluetoothle.unbond({ 'address': address }).pipe(
      filter(result => result.status === 'unbonded'),
      take(1)
    ).toPromise(), DEFAULT_OPERATION_TIMEOUT)
  }

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

  connect (address: string): Observable<IConnectionStatus> {
    return this.bluetoothle.connect({ 'address': address })
  }

  reconnect (address: string): Promise<boolean> {
    return this.bluetoothle.reconnect({ 'address': address }).then(result => result.status === 'connected')
  }

  disconnect (address: string): Promise<boolean> {
    return this.bluetoothle.disconnect({ 'address': address }).then(result => result.status === 'disconnected')
  }

  close (address: string): Promise<boolean> {
    return this.bluetoothle.close({ 'address': address }).then(result => result.status === 'closed')
  }

  discover (address: string): Promise<{
    uuid: string,
    characteristics: {
      uuid: string,
      descriptors: any[]
    }[]
  }[]> {
    return this.bluetoothle.discover({ 'address': address, 'clearCache': true }).then(result => result.services)
  }

  read (address: string, service: string, characteristic: string): Promise<Uint8Array> {
    return this.bluetoothle.read({
      'address': address,
      'service': service,
      'characteristic': characteristic
    }).then(result => this.bluetoothle.encodedStringToBytes(result.value))
  }

  write (address: string, service: string, characteristic: string, cmd: Uint8Array, withoutResponse: boolean): Promise<boolean> {
    let writeParams = {
      'address': address,
      'service': service,
      'characteristic': characteristic,
      'value': this.bluetoothle.bytesToEncodedString(cmd)
    } as any
    if (withoutResponse) {
      writeParams.type = 'noResponse'
    }
    return Promise.resolve().then(() => {
      this.bluetoothle.write(writeParams)
    }).then(result => {
      // console.log(`write response: ${result}`)
      return true
    })
  }

  subscribe (address: string, service: string, characteristic: string): Observable<Uint8Array> {
    return this.bluetoothle.subscribe({
      'address': address,
      'service': service,
      'characteristic': characteristic
    }).pipe(
      filter(result => result.status === 'subscribedResult'),
      map(result => result.value),
      map(b64 => this.bluetoothle.encodedStringToBytes(b64))
    )
  }

  unsubscribe (address: string, service: string, characteristic: string): Promise<boolean> {
    return this.bluetoothle.unsubscribe({
      'address': address,
      'service': service,
      'characteristic': characteristic
    }).then(result => result.status === 'unsubscribed')
  }

  rssi (address: string): Promise<number> {
    return this.bluetoothle.rssi({ 'address': address }).then(result => result.rssi)
  }

  mtu (address: string, mtu: number): Promise<number> {
    return this.bluetoothle.mtu({ 'address': address, 'mtu': mtu }).then(result => result.mtu)
  }

  requestConnectionPriority (address: string, connectionPriority: 'low' | 'balanced' | 'high'): Promise<boolean> {
    return this.bluetoothle.requestConnectionPriority({
      'address': address,
      'connectionPriority': connectionPriority
    }).then(result => result.status === 'connectionPriorityRequested')
  }

  isInitialized (): Promise<boolean> {
    return this.bluetoothle.isInitialized().then(result => result.isInitialized)
  }

  isEnabled (): Promise<boolean> {
    return this.bluetoothle.isEnabled().then(result => result.isEnabled)
  }

  isScanning (): Promise<boolean> {
    return this.bluetoothle.isScanning().then(result => result.isScanning)
  }

  isBonded (address: string): Promise<boolean> {
    return this.bluetoothle.isBonded({ 'address': address }).then(result => result.isBonded)
  }

  wasConnected (address: string): Promise<boolean> {
    return this.bluetoothle.wasConnected({ 'address': address }).then(result => result.wasConnected)
  }

  isConnected (address: string): Promise<boolean> {
    return this.bluetoothle.isConnected({ 'address': address }).then(result => result.isConnected)
  }

  isDiscovered (address: string): Promise<boolean> {
    return this.bluetoothle.isDiscovered({ 'address': address }).then(result => result.isDiscovered)
  }

  hasPermission (): Promise<boolean> {
    return this.bluetoothle.hasPermission().then(result => result.hasPermission)
  }

  requestPermission (): Promise<boolean> {
    return this.bluetoothle.requestPermission().then(result => result.requestPermission)
  }

  isLocationEnabled (): Promise<boolean> {
    return this.bluetoothle.isLocationEnabled().then(result => result.isLocationEnabled)
  }

  requestLocation (): Promise<boolean> {
    return this.bluetoothle.requestLocation().then(result => result.requestLocation)
  }

  bytesToEncodedString (bytes: Uint8Array): string {
    return this.bluetoothle.bytesToEncodedString(bytes)
  }

  encodedStringToBytes (s: string): Uint8Array {
    return this.bluetoothle.encodedStringToBytes(s)
  }
}
