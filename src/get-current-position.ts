import { AccuracyOptions, PositionOptions } from './position-options';

export interface GetCurrentPositionOptions extends Partial<PositionOptions> {

  // `navigator.geolocation.getCurrentPosition` options

  // enableHighAccuracy default: false. See: PositionOptions.enableHighAccuracy
  // maximumAge default: 0. See: PositionOptions.maximumAge
  // timeout default: Infinity. See: PositionOptions.timeout

  // extra options

  // accuracyOptions
  //   maximumAccuracy default: Infinity.
  //   minimumTimestamp default: 0.
  accuracyOptions?: Partial<AccuracyOptions>;
  // maximumRetryCount default: 0.
  maximumRetryCount?: number;
  // `navigator.geolocation.getCurrentPosition` arguments on retry.
  // retryArguments default: [].
  //   enableHighAccuracy default: GetCurrentPositionOptions.enableHighAccuracy.
  //   maximumAge default: GetCurrentPositionOptions.maximumAge.
  //   timeout default: GetCurrentPositionOptions.timeout.
  retryArguments?: PositionOptions[];
}

export type GetCurrentPositionError =
  GetCurrentPositionNotSupportedError |        // getCurrentPosition is not defined
  GetCurrentPositionPermissionDeniedError |    // PositionError.code = 1
  GetCurrentPositionPositionUnavailableError | // PositionError.code = 2
  GetCurrentPositionTimeoutError |             // PositionError.code = 3
  GetCurrentPositionLowAccuracyError |         // low accuracy
  GetCurrentPositionUnknownError;              // unknown

export interface GetCurrentPositionBaseError {
  options: GetCurrentPositionOptions;
}

export interface GetCurrentPositionNotSupportedError
  extends GetCurrentPositionBaseError {
  type: 'not_supported';
}

export interface GetCurrentPositionPermissionDeniedError
  extends GetCurrentPositionBaseError {
  type: 'permission_denied';
}

export interface GetCurrentPositionPositionUnavailableError
  extends GetCurrentPositionBaseError {
  type: 'position_unavailable';
}

export interface GetCurrentPositionTimeoutError
  extends GetCurrentPositionBaseError {
  type: 'timeout';
}

export interface GetCurrentPositionLowAccuracyError
  extends GetCurrentPositionBaseError {
  type: 'low_accuracy';
}

export interface GetCurrentPositionUnknownError
  extends GetCurrentPositionBaseError {
  type: 'unknown';
}

// interface Coordinates {
//   readonly accuracy: number;
//   readonly altitude: number | null;
//   readonly altitudeAccuracy: number | null;
//   readonly heading: number | null;
//   readonly latitude: number;
//   readonly longitude: number;
//   readonly speed: number | null;
// }
//
// interface Position {
//   readonly coords: Coordinates;
//   readonly timestamp: number;
// }

const getCurrentPosition = (
  _options: GetCurrentPositionOptions
): Promise<Position> => {
  return Promise.reject(new Error('Not Implemented Yet'));
};

export { getCurrentPosition };
