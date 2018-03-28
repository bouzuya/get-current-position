import {
  PositionOptionsPrime,
  StrictAccuracyOptions,
  StrictPositionOptions,
  StrictPositionOptionsPrime
} from './type/position-options';

const defaultPositionOptions: StrictPositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Infinity
};

const defaultAccuracyOptions: StrictAccuracyOptions = {
  maximumAccuracy: Infinity,
  minimumTimestamp: 0
};

const defaultMaximumRetryCount: number = 0;

const defaultRetryArguments: StrictPositionOptions[] = [];

const defaultNewPositionOptions: StrictPositionOptionsPrime = {
  ...defaultPositionOptions,
  accuracyOptions: defaultAccuracyOptions,
  maximumRetryCount: defaultMaximumRetryCount,
  retryArguments: defaultRetryArguments
};

const ensure = <T>(v: T | undefined, d: T): T => {
  return typeof v === 'undefined' ? d : v;
};

const ensureAccuracyOptions = (
  v: Partial<StrictAccuracyOptions> | undefined,
  d: StrictAccuracyOptions
): StrictAccuracyOptions => {
  const a = ensure<Partial<StrictAccuracyOptions>>(v, d);
  return {
    maximumAccuracy: ensure(a.maximumAccuracy, d.maximumAccuracy),
    minimumTimestamp: ensure(a.minimumTimestamp, d.minimumTimestamp)
  };
};

const ensurePositionOptions = (
  v: Partial<StrictPositionOptions>,
  d: StrictPositionOptions
): StrictPositionOptions => {
  return {
    enableHighAccuracy: ensure(v.enableHighAccuracy, d.enableHighAccuracy),
    maximumAge: ensure(v.maximumAge, d.maximumAge),
    timeout: ensure(v.timeout, d.timeout)
  };
};

const ensureRetryArguments = (
  v: Array<Partial<StrictPositionOptions>> | undefined,
  d: StrictPositionOptions
): StrictPositionOptions[] => {
  const r = ensure<Array<Partial<StrictPositionOptions>>>(v, []);
  return r.reduce((a, i) => {
    return a.concat([ensurePositionOptions(i, a[a.length - 1])]);
  }, [d]).slice(1);
};

const buildOptions = (
  options?: PositionOptionsPrime
): StrictPositionOptionsPrime => {
  if (typeof options === 'undefined') return defaultNewPositionOptions;
  const positionOptions: StrictPositionOptions = ensurePositionOptions(
    options, defaultPositionOptions
  );
  const accuracyOptions: StrictAccuracyOptions = ensureAccuracyOptions(
    options.accuracyOptions, defaultAccuracyOptions
  );
  const maximumRetryCount = ensure<number>(
    options.maximumRetryCount, defaultMaximumRetryCount
  );
  const retryArguments: StrictPositionOptions[] = ensureRetryArguments(
    options.retryArguments, positionOptions
  );
  return {
    ...positionOptions,
    accuracyOptions,
    maximumRetryCount,
    retryArguments
  };
};

export { buildOptions };
