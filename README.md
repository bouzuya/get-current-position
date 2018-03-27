# get-current-position

`navigator.geolocation.getCurrentPosition` wrapper.

## Installation

```
$ npm install @bouzuya/get-current-position
```

## Usage

```
import { getCurrentPosition } from '@bouzuya/get-current-position';

const main = async () => {
  const position = await getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
  // {
  //   coords: {
  //     accuracy: 30,
  //     altitude: 0,
  //     altitudeAccuracy: 0,
  //     heading: NaN,
  //     latitude: 34.694372,
  //     longitude: 135.201863,
  //     speed: NaN
  //   },
  //   timestamp: 1522119771324
  // }
  console.log(position);
};

main();
```

## API

```typescript
interface GetCurrentPositionOptions {

  // `navigator.geolocation.getCurrentPosition` options

  // default: false. See: PositionOptions.enableHighAccuracy
  enableHighAccuracy?: boolean;
  // default: 0. See: PositionOptions.maximumAge
  maximumAge?: number;
  // default: Infinity. See: PositionOptions.timeout
  timeout?: number;

  // extra options

  accuracyOptions?: {
    // default: Infinity.
    maximumAccuracy?: number;
    // default: 0.
    minimumTimestamp?: number;
  };
  // default: 0.
  maximumRetryCount?: number;
  // default: []. `navigator.geolocation.getCurrentPosition` arguments on retry.
  retryArguments?: {
    // default: GetCurrentPositionOptions.enableHighAccuracy.
    enableHighAccuracy?: boolean;
    // default: GetCurrentPositionOptions.maximumAge.
    maximumAge?: number;
    // default: GetCurrentPositionOptions.timeout.
    timeout?: number;
  }[];
}

type GetCurrentPositionError =
  GetCurrentPositionNotSupportedError |        // getCurrentPosition is not defined
  GetCurrentPositionPermissionDeniedError |    // PositionError.code = 1
  GetCurrentPositionPositionUnavailableError | // PositionError.code = 2
  GetCurrentPositionTimeoutError |             // PositionError.code = 3
  GetCurrentPositionLowAccuracyError |         // low accuracy
  GetCurrentPositionUnknownError;              // unknown

interface GetCurrentPositionBaseError {
  options: GetCurrentPositionOptions;
}

interface GetCurrentPositionNoSupportError
  extends GetCurrentPositionBaseError {
  type: 'not_supported';
}

interface GetCurrentPositionPermissionDeniedError
  extends GetCurrentPositionBaseError {
  type: 'permission_denied';
}

interface GetCurrentPositionPositionUnavailableError
  extends GetCurrentPositionBaseError {
  type: 'position_unavailable';
}

interface GetCurrentPositionTimeoutError
  extends GetCurrentPositionBaseError {
  type: 'timeout';
}

interface GetCurrentPositionLowAccuracyError
  extends GetCurrentPositionBaseError {
  type: 'low_accuracy';
}

interface GetCurrentPositionUnknownError
  extends GetCurrentPositionBaseError {
  type: 'unknown';
}

type getCurrentPosition =
  (options: GetCurrentPositionOptions) => Promise<Position>;

```
