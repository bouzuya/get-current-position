import { buildOptions } from './build-options';
import { getOriginal } from './get-original';
import { PositionOptionsPrime } from './type/position-options';

const promisifyGetCurrentPosition = (
  original: Geolocation['getCurrentPosition']
): (options?: PositionOptions) => Promise<Position> => {
  return (options) => {
    return new Promise((resolve, reject) => {
      return original(resolve, reject, options);
    });
  };
};

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
  options: PositionOptionsPrime
): Promise<Position> => {
  const strictOptions = buildOptions(options);
  const original = getOriginal();
  if (original === null) return Promise.reject(new Error()); // TODO
  const promisifiedGetCurrentPosition = promisifyGetCurrentPosition(original);
  // TODO: retry and error handling
  return promisifiedGetCurrentPosition({
    enableHighAccuracy: strictOptions.enableHighAccuracy,
    maximumAge: strictOptions.maximumAge,
    timeout: strictOptions.timeout
  });
};

export {
  PositionOptionsPrime,
  getCurrentPosition
};
