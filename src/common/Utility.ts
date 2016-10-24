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
