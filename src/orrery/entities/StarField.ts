import { Entity } from "../types/Entity";

export class StarField implements Entity {
  private image: HTMLImageElement;
  private size: number = 500; // dimensions of image (assumed square)
  private init: boolean = false;

  constructor() {
    // draw background pattern
    this.image = new Image();
    this.image.onload = () => this.init = true;
    this.image.src = require("../../../assets/starfield.png");
  }

  update(delta?: number): void {
    // No need to update
  }

  render(context: CanvasRenderingContext2D): void {
    const { width, height } = context.canvas;
    if (!this.init) {
      // draw solid background until image is ready
      context.fillStyle = "#06040e";
      context.rect(0, 0, width, height);
      context.fill();
      return;
    }

    const d = this.size;
    for (let x = 0; x < width / d; x++) {
      for (let y = 0; y < height / d; y++) {
        context.drawImage(this.image, x * d, y * d, d, d);
      }
    }
  }

  setScale(scale: number): void {
    // No need to scale
  }
}
