import { assign } from "../Utility";
import { Entity, Keplerian, Point } from "../types";
import { KeplerianState } from "../state/KeplerianState";
import { Orbit } from "./Orbit";

export interface PlanetRecord extends Keplerian {
  name: string;
  fill?: string | CanvasGradient | CanvasPattern;
  image?: string | ImageData;
}

export class Planet implements Entity, PlanetRecord {
  readonly name: string = "planet";
  readonly semiMajorAxis: number;
  readonly eccentricity: number;
  readonly trueAnomaly: number;
  readonly radius: number = 1;
  readonly fill: string | CanvasGradient | CanvasPattern;

  private step: number = Math.PI / 540; // Math.PI / 90;
  private scale: number = 100.0;
  private planetScale: number = 0.24;
  private state: KeplerianState;

  constructor(elements?: PlanetRecord) {
    assign(this, elements || {});
    this.state = new KeplerianState(this);
  }

  createOrbit(): Orbit {
    return new Orbit({
      focus: this.state.focus,
      scale: this.scale,
      semiMajorAxis: this.semiMajorAxis,
      semiMinorAxis: this.state.semiMinorAxis,
      fill: this.fill.toString()
    });
  }

  update(delta: number): void {
    this.state.advance(this, this.step, this.scale);
  }

  render(context: CanvasRenderingContext2D): void {
    // At default scale 1 Earth radius = 25 pixels
    const r = this.radius * this.planetScale * 25;
    const { x, y } = this.state.position;
    const τ = 6.28319;

    context.beginPath();

    // base fill
    context.fillStyle = this.fill;
    context.ellipse(x, y, r, r, 0, 0, τ);
    context.fill();

    // alpha gradient fill
    context.fillStyle = this.createGradient(context, { x, y }, r);
    context.ellipse(x, y, r, r, 0, 0, τ);
    context.fill();

    context.closePath();
  }

  setScale(scale: number): void {
    this.scale = scale;
    this.planetScale = scale * 0.0024;
  }

  private createGradient(context: CanvasRenderingContext2D,
    pos: Point, radius: number): CanvasGradient {
    const { x, y } = pos;
    const x2 = x - radius * 1.5 * Math.cos(this.state.angle);
    const y2 = y - radius * Math.sin(this.state.angle);
    const gradient = context.createRadialGradient(x, y, radius * 2, x2, y2, 0);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
    gradient.addColorStop(0.6, this.fill.toString());
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
    return gradient;
  }
}

export { Orbit } from "./Orbit";
