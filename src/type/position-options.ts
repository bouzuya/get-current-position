// https://w3c.github.io/geolocation-api/#dom-positionoptions
export interface PositionOptions {
  enableHighAccuracy: boolean;
  maximumAge: number;
  timeout: number;
}

export interface AccuracyOptions {
  maximumAccuracy: number;
  minimumTimestamp: number;
}

export interface NewPositionOptions extends PositionOptions {
  accuracyOptions: AccuracyOptions;
  maximumRetryCount: number;
  retryArguments: PositionOptions[];
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
//     enableHighAccuracy default: GetCurrentPositionOptions.enableHighAccuracy.
//     maximumAge default: GetCurrentPositionOptions.maximumAge.
//     timeout default: GetCurrentPositionOptions.timeout.
export interface GetCurrentPositionOptions extends Partial<PositionOptions> {
  accuracyOptions?: Partial<AccuracyOptions>;
  maximumRetryCount?: number;
  retryArguments?: Array<Partial<PositionOptions>>;
}
