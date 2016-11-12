import { assign } from "../Utility";
import { Entity, Keplerian, Point } from "../types";

export interface OrbitRecord {
  focus: number;
  scale: number;
  semiMajorAxis: number;
  semiMinorAxis: number;
  fill: string;
}

export class Orbit implements Entity, OrbitRecord {
  focus: number;
  scale: number;
  semiMajorAxis: number;
  semiMinorAxis: number;
  fill: string;

  constructor(elements?: OrbitRecord) {
    assign(this, elements || {});
  }

  update(delta: number): void {
    // Nein
  }

  render(context: CanvasRenderingContext2D): void {
    const τ = 6.28319;
    // draw orbit
    context.beginPath();
    context.strokeStyle = this.fill;
    context.ellipse(this.focus * this.scale, 0,
      this.semiMajorAxis * this.scale,
      this.semiMinorAxis * this.scale, 0, 0, τ);
    context.stroke();
    context.closePath();
  }

  setScale(scale: number) {
    this.scale = scale;
  }
}
