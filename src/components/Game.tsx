import * as React from "react";
import * as engine from "../engine/Engine";

export interface GameProps {
  name: string;
  width: number | string;
  height: number | string;
}

export class Game extends React.Component<GameProps, {}> {
  private game: engine.Engine;
  private canvas: HTMLCanvasElement;

  constructor(props: GameProps) {
    super(props);
    this.game = new engine.EngineSingle();
  }

  render() {
    return (
      <div>
        <h1>Welcome to {this.props.name}</h1>
        <canvas ref={(el) => this.canvas = el}
          width={this.props.width}
          height={this.props.height} />
      </div>
    );
  }

  componentDidMount() {
    // Bootstrap the game engine
    this.game
      .attach(this.canvas)
      .start();
  }
}
