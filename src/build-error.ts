import {
  PositionNotSupportedError,
  PositionPermissionDeniedError,
  PositionPositionUnavailableError,
  PositionTimeoutError,
  PositionUnknownError
} from './type/position-error';
import { StrictPositionOptions } from './type/position-options';

const buildNotSupportedError = (
  options: StrictPositionOptions
): PositionNotSupportedError => {
  return {
    options,
    type: 'not_supported'
  };
};

const buildPermissionDeniedError = (
  options: StrictPositionOptions
): PositionPermissionDeniedError => {
  return {
    options,
    type: 'permission_denied'
  };
};

const buildPositionUnavailableError = (
  options: StrictPositionOptions
): PositionPositionUnavailableError => {
  return {
    options,
    type: 'position_unavailable'
  };
};

const buildTimeoutError = (
  options: StrictPositionOptions
): PositionTimeoutError => {
  return {
    options,
    type: 'timeout'
  };
};

const buildUnknownError = (
  options: StrictPositionOptions
): PositionUnknownError => {
  return {
    options,
    type: 'unknown'
  };
};

export {
  buildNotSupportedError,
  buildPermissionDeniedError,
  buildPositionUnavailableError,
  buildTimeoutError,
  buildUnknownError
};
