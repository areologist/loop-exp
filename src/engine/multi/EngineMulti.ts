import { Engine } from "../Engine";
import { EntityLoader, Entity } from "../EntityLoader";

export class EngineMulti implements Engine {
  name: string = "Multi-threaded engine instance";

  attach(canvasElement: HTMLCanvasElement): Engine {
    console.log("EngineMulti::attach called.");
    return this;
  }

  start(settings: any = {}): void {
    console.log("EngineMulti::start called.");
  }

  stop(): void {
    console.log("EngineMulti::stop called.");
  }
}
