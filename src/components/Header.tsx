import { Component, ReactNode } from "react";

interface MyComponentProps {
  message: string;
}

interface MyComponentState {
  count: number;
}

export default class Header extends Component<
  MyComponentProps,
  MyComponentState
> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        {/*<p>{this.props.message}</p>*/}
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    ) as ReactNode;
  }
}
