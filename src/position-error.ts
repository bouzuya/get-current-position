import { NewPositionOptions } from './position-options';

export type GetCurrentPositionError =
  GetCurrentPositionNotSupportedError |        // getCurrentPosition is not defined
  GetCurrentPositionPermissionDeniedError |    // PositionError.code = 1
  GetCurrentPositionPositionUnavailableError | // PositionError.code = 2
  GetCurrentPositionTimeoutError |             // PositionError.code = 3
  GetCurrentPositionLowAccuracyError |         // low accuracy
  GetCurrentPositionUnknownError;              // unknown

export interface GetCurrentPositionBaseError {
  options: NewPositionOptions;
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
