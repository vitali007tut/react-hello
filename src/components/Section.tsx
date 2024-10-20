import { Component } from "react";
import Character, { Props } from "./Character";

type TProps = {
  data: Props[] | null;
  loading: boolean;
};

export default class Section extends Component<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    if (this.props.loading) return <h2>Loading...</h2>;
    if (!this.props.data?.length) return <h2>No characters found</h2>;

    return (
      <div className={"cardsContainer"}>
        {this.props.data.map((item) => (
          <Character
            key={item.fullName}
            birthdate={item.birthdate}
            children={item.children}
            fullName={item.fullName}
            hogwartsHouse={item.hogwartsHouse}
            image={item.image}
            index={item.index}
            interpretedBy={item.interpretedBy}
            nickname={item.nickname}
          />
        ))}
      </div>
    );
  }
}
