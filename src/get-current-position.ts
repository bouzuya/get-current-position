import {
  buildLowAccuracyError,
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
  error: PositionError | PositionErrorPrime,
  options: StrictPositionOptions
): PositionErrorPrime => {
  const isPositionErrorPrime = (e: any): e is PositionErrorPrime => {
    return [
      'low_accuracy',
      'not_supported',
      'permission_denied',
      'position_unavailable',
      'timeout',
      'unknown'
    ].indexOf(e.type) >= 0;
  };
  if (isPositionErrorPrime(error)) return error;
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

const getStrictOptions = (
  strictOptionsPrime: StrictPositionOptionsPrime,
  retryCount: number
): StrictPositionOptions => {
  const args = [
    {
      enableHighAccuracy: strictOptionsPrime.enableHighAccuracy,
      maximumAge: strictOptionsPrime.maximumAge,
      timeout: strictOptionsPrime.timeout
    }
  ].concat(strictOptionsPrime.retryArguments);
  const index = Math.max(0, Math.min(retryCount - 1, args.length - 1));
  return args[index];
};

const tryCall = (
  promisified: (options?: PositionOptions) => Promise<Position>,
  strictOptionsPrime: StrictPositionOptionsPrime,
  retryCount: number
): Promise<Position> => {
  const strictOptions = getStrictOptions(strictOptionsPrime, retryCount);
  return promisified(strictOptions)
    .then((position) => {
      const { coords: { accuracy }, timestamp } = position;
      const { accuracyOptions } = strictOptionsPrime;
      if (
        accuracy > accuracyOptions.maximumAccuracy ||
        timestamp < accuracyOptions.minimumTimestamp
      ) {
        const errorPrime = buildLowAccuracyError(strictOptions, position);
        return Promise.reject(errorPrime);
      }
      return Promise.resolve(position);
    })
    .catch((error: PositionError | PositionErrorPrime) => {
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
