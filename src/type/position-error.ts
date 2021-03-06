import { StrictPositionOptions } from './position-options';

export type PositionErrorPrime =
  PositionLowAccuracyError |         // low accuracy
  PositionNotSupportedError |        // getCurrentPosition is not defined
  PositionPermissionDeniedError |    // PositionError.code = 1
  PositionPositionUnavailableError | // PositionError.code = 2
  PositionTimeoutError |             // PositionError.code = 3
  PositionUnknownError;              // unknown

export interface PositionBaseError {
  options: StrictPositionOptions;
}

export interface PositionLowAccuracyError
  extends PositionBaseError {
  position: Position;
  type: 'low_accuracy';
}

export interface PositionNotSupportedError
  extends PositionBaseError {
  type: 'not_supported';
}

export interface PositionPermissionDeniedError
  extends PositionBaseError {
  type: 'permission_denied';
}

export interface PositionPositionUnavailableError
  extends PositionBaseError {
  type: 'position_unavailable';
}

export interface PositionTimeoutError
  extends PositionBaseError {
  type: 'timeout';
}

export interface PositionUnknownError
  extends PositionBaseError {
  type: 'unknown';
}
