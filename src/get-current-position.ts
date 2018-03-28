import { buildOptions } from './build-options';
import { PositionOptionsPrime } from './type/position-options';

type GetCurrentPosition = Geolocation['getCurrentPosition'];
type PromisifiedGetCurrentPosition =
  (options?: PositionOptions) => Promise<Position>;

const getGetCurrentPosition = (): GetCurrentPosition | null => {
  const w = window;
  if (typeof w === 'undefined') return null;
  const n = w.navigator;
  if (typeof n === 'undefined') return null;
  const g = n.geolocation;
  if (typeof g === 'undefined') return null;
  const f = g.getCurrentPosition;
  if (typeof f === 'undefined') return null;
  return f;
};

const promisifyGetCurrentPosition = (
  original: GetCurrentPosition
): PromisifiedGetCurrentPosition => {
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
  const original = getGetCurrentPosition();
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
