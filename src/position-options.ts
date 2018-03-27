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
