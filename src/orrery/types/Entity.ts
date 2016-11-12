export interface Entity {
  update(delta: number): void;
  render(context: CanvasRenderingContext2D): void;
  setScale(scale: number): void;
}
