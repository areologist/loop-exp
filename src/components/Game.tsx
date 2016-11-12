import * as React from "react";
import * as ReactDom from "react-dom";
import { Point } from "../orrery/types/Point";
import { Orrery } from "../orrery/Orrery";

export interface GameProps {
  name: string;
  width?: number | string;
  height?: number | string;
}

export class Game extends React.Component<GameProps, {}> {
  private orrery: Orrery;
  private canvas: HTMLCanvasElement;
  private panning: boolean;
  private lastPos: Point;

  constructor(props: GameProps) {
    super(props);
    this.orrery = new Orrery();
  }

  handleWheel(event: React.WheelEvent<any>) {
    event.preventDefault();
    this.orrery.zoom(event.deltaY);
  }

  handleMouseDown(event: React.MouseEvent<any>) {
    this.lastPos = { x: event.clientX, y: event.clientY };
    this.panning = true;
  }

  handleMouseMove(event: React.MouseEvent<any>) {
    if (!this.panning) {
      return;
    }
    event.preventDefault();
    this.orrery.pan({
      x: event.clientX - this.lastPos.x,
      y: event.clientY - this.lastPos.y
    });
    this.lastPos = { x: event.clientX, y: event.clientY };
  }

  render() {
    return (
      <canvas ref={(el) => this.canvas = el}
        width={this.props.width}
        height={this.props.height}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={() => this.panning = false}
        onMouseMove={this.handleMouseMove.bind(this)}
        onWheel={this.handleWheel.bind(this)} />
    );
  }

  componentDidMount() {
    // Bootstrap the orrery
    this.orrery
      .attach(this.canvas)
      .start();
  }
}
