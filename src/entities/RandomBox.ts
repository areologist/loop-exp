import { assign } from '../common/Utility';
import { Entity } from "./Entity";
import { Box } from "./Box";

export class RandomBox implements Entity, Box {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string | CanvasGradient | CanvasPattern;

  constructor(initialState?: Box) {
    assign(this, initialState || randomBox());
  }

  update(delta: number): void {
    assign(this, randomBox(), { fill: randomRgb() });
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.fill;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Box } from './Box';

// Bogus helper functions for our test scenario.

function randomBox(): Box {
  return {
    x: Math.floor(Math.random() * 850),
    y: Math.floor(Math.random() * 430),
    width: 50,
    height: 50
  };
}

function randomRgb() {
  const r = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${b}, ${g})`;
}
