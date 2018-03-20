
# Cordova Bluetoothle Ionic Native Wrapper

This is a Ionic Native wrapper for [cordova-plugin-bluetoothle](https://github.com/randdusing/cordova-plugin-bluetoothle).

## Installation

Run following command to install this wrapper in your project.
```bash
npm install ionic-native-bluetoothle --save
```

You also need to install the bluetoothle cordova plugin.
```bash
cordova plugin add cordova-plugin-bluetoothle
```

## Documentation

See [cordova-plugin-bluetoothle](https://github.com/randdusing/cordova-plugin-bluetoothle) for API details.
Also see the demo here: https://github.com/dodoinblue/bluetoothle-demo

### Basic Usage

To use a plugin, import and add the plugin provider to your `@NgModule`, and then inject it where you wish to use it.

```typescript
// app.module.ts
import { BluetoothLe } from 'ionic-native-bluetoothle';

...

@NgModule({
  ...

  providers: [
    ...
    BluetoothLe
    ...
  ]
  ...
})
export class AppModule { }
```

```typescript
import { BluetoothLe } from 'ionic-native-bluetoothle';
import { Platform } from 'ionic-angular';

import { NgZone } from '@angular/core';

@Component({ ... })
export class MyComponent {

  constructor(private ble: BluetoothLe, private platform: Platform) {

    platform.ready().then(() => {
      this.ble.initialize().take(1).subscribe(result => {
        console.log(`bluetooth status: ${result.status}`)
      })
    });
  }
  
}
```

### Mocking and Browser Development

Basic mocking for development in browser is provided. To use the basic mocking class, first import both real and mock class in your `src/app/app.module.ts` file

```typescript
import { BluetoothLe } from 'ionic-native-bluetoothle';
import { BluetoothLeMock } from 'ionic-native-bluetoothle/mocks/BluetoothLeMock';
```

And override previous `BluetoothLe` class in `providers` section in `src/app/app.module.ts`
```typescript
providers: [
  { provide: BluetoothLe, useClass: BluetoothLeMock }
]
```

If you'd like to modify the Mock behavior, extend it to your own class, and replace `BluetoothLeMock` in the previous steps with your class. Example:

```typescript
// YourBleMock.ts
import { BluetoothLeMock } from 'ionic-native-bluetoothle/mocks/BluetoothLeMock';

export class YourBleMock extends BluetoothLeMock {

}

// app.module.ts
import { BluetoothLe } from 'ionic-native-bluetoothle';
import { YourBleMock } from 'path/to/YourBleMock.ts';

...

providers: [
  { provide: BluetoothLe, useClass: YourBleMock }
]
```

# Credits

This plugin is based on:
* https://github.com/randdusing/cordova-plugin-bluetoothle
* https://github.com/ionic-team/ionic-native
