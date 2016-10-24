export interface Engine {
  name: string;
  attach(canvasElement: HTMLCanvasElement): Engine;
  start(settings?: any): void;
  stop(): void;
}

export { EngineSingle } from "./single/EngineSingle";
export { EngineMulti } from "./multi/EngineMulti";
