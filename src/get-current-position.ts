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
import {
  PositionOptionsPrime,
  StrictPositionOptions,
  StrictPositionOptionsPrime
} from './type/position-options';

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

const tryCall = (
  promisified: (options?: PositionOptions) => Promise<Position>,
  strictOptionsPrime: StrictPositionOptionsPrime,
  retryCount: number
): Promise<Position> => {
  const strictOptions = retryCount === 0
    ? {
      enableHighAccuracy: strictOptionsPrime.enableHighAccuracy,
      maximumAge: strictOptionsPrime.maximumAge,
      timeout: strictOptionsPrime.timeout
    }
    // TODO: StrictPositionOptions | undefined
    : strictOptionsPrime.retryArguments[retryCount - 1];

  // TODO: low accuracy
  return promisified(strictOptions).catch((error: PositionError) => {
    const errorPrime = wrapError(error, strictOptionsPrime);
    const retry =
      errorPrime.type === 'low_accuracy' ||
      errorPrime.type === 'position_unavailable' ||
      errorPrime.type === 'timeout';
    if (retry && retryCount < strictOptionsPrime.maximumRetryCount) {
      return tryCall(promisified, strictOptionsPrime, retryCount + 1);
    } else {
      return Promise.reject(errorPrime);
    }
  });
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
  const strictOptionsPrime = buildOptions(options);
  const original = getOriginal();
  if (original === null) {
    const error = buildNotSupportedError(strictOptionsPrime);
    return Promise.reject(error);
  }
  const promisified = promisifyGetCurrentPosition(original);
  return tryCall(promisified, strictOptionsPrime, 0);
};

export {
  PositionOptionsPrime,
  getCurrentPosition
};
