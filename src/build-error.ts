import { PositionNotSupportedError } from './type/position-error';
import { StrictPositionOptions } from './type/position-options';

const buildNotSupportedError = (
  options: StrictPositionOptions
): PositionNotSupportedError => {
  return {
    options,
    type: 'not_supported'
  };
};

export { buildNotSupportedError };
