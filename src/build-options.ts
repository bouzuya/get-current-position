import {
  AccuracyOptions,
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

const ensure = <T>(v: T | undefined, d: T): T => {
  return typeof v === 'undefined' ? d : v;
};

const ensureAccuracyOptions = (
  v: Partial<AccuracyOptions> | undefined,
  d: AccuracyOptions
): AccuracyOptions => {
  const a = ensure<Partial<AccuracyOptions>>(v, d);
  return {
    maximumAccuracy: ensure(a.maximumAccuracy, d.maximumAccuracy),
    minimumTimestamp: ensure(a.minimumTimestamp, d.minimumTimestamp)
  };
};

const ensurePositionOptions = (
  v: Partial<PositionOptions>,
  d: PositionOptions
): PositionOptions => {
  return {
    enableHighAccuracy: ensure(v.enableHighAccuracy, d.enableHighAccuracy),
    maximumAge: ensure(v.maximumAge, d.maximumAge),
    timeout: ensure(v.timeout, d.timeout)
  };
};

const ensureRetryArguments = (
  v: Array<Partial<PositionOptions>> | undefined,
  d: PositionOptions
): PositionOptions[] => {
  const r = ensure<Array<Partial<PositionOptions>>>(v, []);
  return r.reduce((a, i) => {
    return a.concat([ensurePositionOptions(i, a[a.length - 1])]);
  }, [d]).slice(1);
};

const buildOptions = (
  options?: GetCurrentPositionOptions
): NewPositionOptions => {
  if (typeof options === 'undefined') return defaultNewPositionOptions;
  const positionOptions: PositionOptions = ensurePositionOptions(
    options, defaultPositionOptions
  );
  const accuracyOptions: AccuracyOptions = ensureAccuracyOptions(
    options.accuracyOptions, defaultAccuracyOptions
  );
  const maximumRetryCount = ensure<number>(
    options.maximumRetryCount, defaultMaximumRetryCount
  );
  const retryArguments: PositionOptions[] = ensureRetryArguments(
    options.retryArguments, positionOptions
  );
  return {
    ...positionOptions,
    accuracyOptions,
    maximumRetryCount,
    retryArguments
  };
};

export {
  NewPositionOptions,
  buildOptions
};
