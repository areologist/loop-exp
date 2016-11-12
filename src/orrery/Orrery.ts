import { constrain } from "./Utility";
import { Point, addp, constrainp } from "./types/Point";
import { EntityLoader, Entity } from "./EntityLoader";
import { StarField } from "./entities/StarField";
import { PlanetarySystem } from "./entities/PlanetarySystem";

export class Orrery {
  private context: CanvasRenderingContext2D;
  private loader: EntityLoader;
  private entities: Array<Entity>;
  private stopMain: number;
  private lastTime: number = 0;
  private settings = {
    scale: 100.0
  };

  attach(canvasElement: HTMLCanvasElement): Orrery {
    this.context = canvasElement.getContext("2d");
    window.addEventListener("resize", this.resize, false);
    this.resize();
    return this;
  }

  start(settings: Object = {}): void {
    // Add base star field
    this.entities = [];
    this.entities.push(new StarField());

    // Load up the planets
    this.loader = new EntityLoader();
    const solarSystem: PlanetarySystem = this.loader.loadSolarSystem();

    // Center the solar system
    solarSystem.position = {
      x: this.context.canvas.width / 2,
      y: this.context.canvas.height / 2
    };

    // Add solar system to entities list
    this.entities.push(solarSystem);

    // Kickoff the `main()` rendering loop.
    this.main(0);
  }

  stop(): void {
    window.cancelAnimationFrame(this.stopMain);
  }

  zoom(change: number): void {
    const f = this.settings.scale / 500 + 0.05;
    const scale = this.settings.scale + change * f;
    this.settings.scale = constrain(scale, 2, 5000);
    this.entities.forEach(e => e.setScale(this.settings.scale));
  }

  pan(change: Point): void {
    const canvas = this.context.canvas;
    let { scale } = this.settings;
    scale = (scale - 2) ** (scale / 50);
    const min = { x: -scale, y: -scale };
    const max = { x: canvas.width + scale, y: canvas.height + scale };
    this.entities
      .filter((entity) => entity instanceof PlanetarySystem)
      .map(entity => entity as PlanetarySystem)
      .forEach(system =>
        system.position = constrainp(addp(system.position, change), min, max));
  }

    // A stupid simple `main()` function for our testing purposes.
    private main: FrameRequestCallback = (time: number) => {
      this.stopMain = window.requestAnimationFrame(this.main);
      const canvas = this.context.canvas;

      this.entities.forEach(entity => {
        entity.update(time - this.lastTime);
        entity.render(this.context);
      });

      // `delta` will be 16.674 ms at 16 fps
      this.lastTime = time;
    };

    private resize = () => {
      // Resize the canvas
      const canvas = this.context.canvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
}
