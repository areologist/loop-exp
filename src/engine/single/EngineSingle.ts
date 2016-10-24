import { Engine } from "../Engine";
import { EntityLoader, Entity } from "../EntityLoader";

export class EngineSingle implements Engine {
  name: string = "Single-threaded engine instance";

  private context: CanvasRenderingContext2D;
  private loader: EntityLoader;
  private entities: Array<Entity>;
  private isRunning: boolean = false;
  private stopMain: number;

  // A fake little `main()` function for our testing purposes.
  private main: FrameRequestCallback = (time: number) => {
    this.stopMain = window.requestAnimationFrame(this.main);

    this.entities.forEach(entity => {
      entity.update(time);
      entity.render(this.context);
    });
  };

  attach(canvasElement: HTMLCanvasElement): Engine {
    console.log("EngineSingle::attach called.");
    this.context = canvasElement.getContext("2d");
    return this;
  }

  start(settings: any = {}): void {
    console.log("EngineSingle::start called.");
    if (this.isRunning) {
      throw new Error("Cannot call `start()` more than once.");
    }

    this.loader = new EntityLoader();
    this.entities = this.loader.loadBoxes(50);

    // Kickoff the `main()` game loop.
    this.main(0);

    this.isRunning = true;
  }

  stop(): void {
    console.log("EngineSingle::stop called.");
    window.cancelAnimationFrame(this.stopMain);
    this.isRunning = false;
  }
}
