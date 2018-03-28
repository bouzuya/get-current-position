import {
  DeepPartial, GetCurrentPositionOptions, NewPositionOptions
} from './position-options';

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
  _options: GetCurrentPositionOptions
): Promise<Position> => {
  return Promise.reject(new Error('Not Implemented Yet'));
};

export {
  DeepPartial, GetCurrentPositionOptions, NewPositionOptions,
  getCurrentPosition
};
