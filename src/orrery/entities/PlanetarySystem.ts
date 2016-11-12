import { Entity, Point } from "../types";
import { Planet, Orbit } from "./Planet";

export class PlanetarySystem implements Entity {
  name: string;
  planets: Array<Planet>;
  orbits: Array<Orbit>;
  position: Point;

  constructor(name?: string, planets?: Array<Planet>, orbits?: Array<Orbit>) {
    this.name = name || "planetary system";
    this.planets = planets || [];
    this.orbits = orbits || [];
    this.position = { x: 0, y: 0 };
  }

  update(delta: number): void {
    this.planets.forEach(p => p.update(delta));
  }

  render(context: CanvasRenderingContext2D): void {
    // translate system
    const { x, y } = this.position;
    context.translate(x, y);

    // draw orbits
    context.globalAlpha = 0.4;
    this.orbits.forEach(o => o.render(context));
    context.globalAlpha = 1;

    // draw planets
    this.planets.forEach(p => p.render(context));

    // reset matrix
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  setScale(scale: number) {
    this.orbits.forEach(o => o.setScale(scale));
    this.planets.forEach(p => p.setScale(scale));
  }
}
