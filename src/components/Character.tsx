import { Component } from "react";

export type Props = {
  birthdate: string;
  children: Props[];
  fullName: string;
  hogwartsHouse: string;
  image: string;
  index: number;
  interpretedBy: string;
  nickname: string;
};

type TState = {
  character: Props;
};

class Character extends Component<Props, TState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      character: props,
    };
  }

  render() {
    return (
      <div>
        <div className="card" key={this.state.character.fullName}>
          <img src={this.state.character.image} className="book-img" />
          <h3>{this.state.character.nickname}</h3>
          <pre>{`${this.state.character.index} - ${this.state.character.fullName}`}</pre>
          <div>{this.state.character.birthdate}</div>
          <div>{`Actor: ${this.state.character.interpretedBy}`}</div>
        </div>
      </div>
    );
  }
}

export default Character;
