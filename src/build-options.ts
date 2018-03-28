import {
  AccuracyOptions,
  DeepPartial,
  GetCurrentPositionOptions,
  NewPositionOptions,
  PositionOptions
} from './type/position-options';

const defaultPositionOptions: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Infinity
};

const defaultAccuracyOptions: AccuracyOptions = {
  maximumAccuracy: Infinity,
  minimumTimestamp: 0
};

const defaultMaximumRetryCount: number = 0;

const defaultRetryArguments: PositionOptions[] = [];

const defaultNewPositionOptions: NewPositionOptions = {
  ...defaultPositionOptions,
  accuracyOptions: defaultAccuracyOptions,
  maximumRetryCount: defaultMaximumRetryCount,
  retryArguments: defaultRetryArguments
};

const buildOptions = (
  options?: GetCurrentPositionOptions
): NewPositionOptions => {
  if (typeof options === 'undefined') return defaultNewPositionOptions;
  throw new Error('Not Implemented Yet');
};

export {
  DeepPartial, NewPositionOptions,
  buildOptions
};
