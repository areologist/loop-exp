import { Keplerian, Point } from "../types";

export class KeplerianState {
  public angle: number;
  public position: Point = { x: 0, y: 0 };

  readonly period: number;
  readonly periapsis: number;
  readonly semiMinorAxis: number;
  readonly focus: number;

  constructor(elements: Keplerian) {
    // Use Kepler's 3rd law to approximate period and other elements
    this.period = elements.semiMajorAxis ** 3 ** 0.5;
    this.periapsis = (1 - elements.eccentricity) * elements.semiMajorAxis;
    this.semiMinorAxis =
      elements.semiMajorAxis * (1 - elements.eccentricity ** 2) ** 0.5;
    this.focus = (elements.semiMajorAxis ** 2 - this.semiMinorAxis ** 2) ** 0.5;
    this.angle = elements.trueAnomaly;
  }

  /**
   *
   */
  advance(elements: Keplerian, step: number, scale: number = 1) {
    // Increment the true anomaly (angle from periapsis).
    this.angle += step * (1 / this.period) || 0;

    // Calculate distance given current parameters.
    const rv = elements.semiMajorAxis * (1 - elements.eccentricity ** 2) /
      (1 + elements.eccentricity * Math.cos(this.angle));

    // Get (x, y) coords for angle on unit circle and scale vector by
    // current distance from center. `scale` is current canvas zoom.
    this.position = {
      x: Math.cos(this.angle) * rv * scale +
        ((elements.semiMajorAxis - this.periapsis + this.focus) * scale),
      y: Math.sin(this.angle) * rv * scale
    };
  }
}
