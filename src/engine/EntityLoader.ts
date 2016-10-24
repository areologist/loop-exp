import { RandomBox } from "../entities/RandomBox";

export class EntityLoader {
  /**
   * Creates a list of random box entities.
   * Number of boxes determined by `boxCount` arg.
   */
  loadBoxes(boxCount: number = 10): Array<RandomBox> {
    return Array
      .apply(null, { length: boxCount })
      .map(() => new RandomBox());
  }
}

export { Entity } from "../entities/Entity";
