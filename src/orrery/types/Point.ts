import { constrain } from "../Utility";

export interface Point {
  x: number;
  y: number;
}

// Utility functions

export const addp = (p1: Point, p2: Point) => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y
});

export const scalep = (p: Point, factor: number) => ({
  x: p.x * factor,
  y: p.y * factor
});

export const constrainp = (p: Point, min: Point, max: Point) => ({
  x: constrain(p.x, min.x, max.x),
  y: constrain(p.y, min.y, max.y)
});
