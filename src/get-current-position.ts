import {
  buildNotSupportedError,
  buildPermissionDeniedError,
  buildPositionUnavailableError,
  buildTimeoutError,
  buildUnknownError
} from './build-error';
import { buildOptions } from './build-options';
import { getOriginal } from './get-original';
import { PositionErrorPrime } from './type/position-error';
import { PositionOptionsPrime, StrictPositionOptions } from './type/position-options';

const promisifyGetCurrentPosition = (
  original: Geolocation['getCurrentPosition']
): (options?: PositionOptions) => Promise<Position> => {
  return (options) => {
    return new Promise((resolve, reject) => {
      return original(resolve, reject, options);
    });
  };
};

const wrapError = (
  error: PositionError,
  options: StrictPositionOptions
): PositionErrorPrime => {
  switch (error.code) {
    case 1: // PERMISSION_DENIED
      return buildPermissionDeniedError(options);
    case 2: // POSITION_UNAVAILABLE
      return buildPositionUnavailableError(options);
    case 3: // TIMEOUT
      return buildTimeoutError(options);
    default: // UNKNOWN
      return buildUnknownError(options);
  }
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
  options?: PositionOptionsPrime
): Promise<Position> => {
  const strictOptions = buildOptions(options);
  const original = getOriginal();
  if (original === null) {
    const error = buildNotSupportedError(strictOptions);
    return Promise.reject(error);
  }
  const promisifiedGetCurrentPosition = promisifyGetCurrentPosition(original);
  return promisifiedGetCurrentPosition({
    enableHighAccuracy: strictOptions.enableHighAccuracy,
    maximumAge: strictOptions.maximumAge,
    timeout: strictOptions.timeout
  }).catch((error: PositionError) => {
    const errorPrime = wrapError(error, strictOptions);
    // TODO: retry
    return Promise.reject(errorPrime);
  });
};

export {
  PositionOptionsPrime,
  getCurrentPosition
};
