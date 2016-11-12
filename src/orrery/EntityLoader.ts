import { Planet, PlanetRecord, Orbit } from "./entities/Planet";
import { PlanetarySystem } from "./entities/PlanetarySystem";
import { randomRgb } from "./Utility";

export class EntityLoader {
  /**
   * "They can make planets." - Matlz
   */
  loadSolarSystem(): PlanetarySystem {
    // Load up solar system plus n random planets
    const n = 0;
    const planets: Array<PlanetRecord> = require("../../data/planets.json");
    for (let i = 0; i < n; i++) {
      planets.push(randomPlanet());
    }
    const majorPlanets = planets.map(p => new Planet(p));
    // Add orbits
    const orbits = majorPlanets.map(p => p.createOrbit());
    return new PlanetarySystem("The Solar System", majorPlanets, orbits);
  }
}

// Helper functions for generating test data.

function randomPlanet(): Planet {
  return new Planet({
    semiMajorAxis: randomSma(),
    eccentricity: Math.random() * 0.3,
    trueAnomaly: Math.random() * (Math.PI * 2),
    radius: randomRadius(),
    name: "random planet",
    fill: randomRgb()
  });
}

function randomRadius(): number {
  const b = [];
  for (let i = 0; i < 100; i++) {
    b.push(0.1 + i * 0.04);
  }
  b.push(15);
  const n = Math.floor(Math.random() * b.length);
  return Math.random() * b[n] + 0.3;
}

function randomSma(): number {
  const b = [1, 2, 4, 8, 15, 20, 25, 35, 40, 50];
  const n = Math.floor(Math.random() * b.length);
  return Math.random() * b[n] + 0.1;
}

export { Entity } from "./types/Entity";
