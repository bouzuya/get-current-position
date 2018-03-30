const getOriginal = (): Geolocation['getCurrentPosition'] | null => {
  if (typeof window === 'undefined') return null;
  const n = window.navigator;
  if (typeof n === 'undefined') return null;
  const g = n.geolocation;
  if (typeof g === 'undefined') return null;
  const f = g.getCurrentPosition;
  if (typeof f === 'undefined') return null;
  return f.bind(g);
};

export { getOriginal };
