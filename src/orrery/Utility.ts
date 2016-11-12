/**
 * Copies values from one or more source objects to target object.
 * This implementation does not return a new object but only modifies
 * `target` in place.
 */
export function assign(target: Object, ...sources: Array<Object>): void {
  let field: string;
  sources.forEach(obj => {
    for (field in obj) {
      (<any>target)[field] = (<any>obj)[field];
    }
  });
}

/**
 * Returns `min` if `val` is less than `min`; returns `max` if `val` is greater
 * than `max`; otherwise, returns `val`.
 */
export function constrain(val: number, min: number, max: number) {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }
  return val;
}

/**
 * Generates a random `rgb(n,n,n)` string.
 */
export function randomRgb(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}
