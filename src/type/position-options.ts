// https://w3c.github.io/geolocation-api/#dom-positionoptions
// PositionOptions = Partial<StrictPositionOptions>
export interface StrictPositionOptions {
  enableHighAccuracy: boolean;
  maximumAge: number;
  timeout: number;
}

export interface StrictAccuracyOptions {
  maximumAccuracy: number;
  minimumTimestamp: number;
}

export type AccuracyOptions = Partial<StrictAccuracyOptions>;

export interface StrictPositionOptionsPrime extends StrictPositionOptions {
  accuracyOptions: StrictAccuracyOptions;
  maximumRetryCount: number;
  retryArguments: StrictPositionOptions[];
}

// `geolocation.PositionOptions` options
//   enableHighAccuracy default: false. See: PositionOptions.enableHighAccuracy
//   maximumAge default: 0. See: PositionOptions.maximumAge
//   timeout default: Infinity. See: PositionOptions.timeout
// extra options
//   accuracyOptions
//     maximumAccuracy default: Infinity.
//     minimumTimestamp default: 0.
//   maximumRetryCount default: 0.
//   retryArguments default: [].
//     enableHighAccuracy default: last enableHighAccuracy or GetCurrentPositionOptions.enableHighAccuracy.
//     maximumAge default: last maximumAge or GetCurrentPositionOptions.maximumAge.
//     timeout default: last timeout or GetCurrentPositionOptions.timeout.
export interface PositionOptionsPrime extends Partial<StrictPositionOptions> {
  accuracyOptions?: Partial<StrictAccuracyOptions>;
  maximumRetryCount?: number;
  retryArguments?: Array<Partial<StrictPositionOptions>>;
}
