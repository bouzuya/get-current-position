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
