import { Component } from 'react';

type TProps = unknown

interface TState {
    shouldError: boolean;
}

export default class ErrorButton extends Component<TProps, TState> {
    constructor(props: TProps) {
        super(props);
        this.state = {
            shouldError: false
        };
    }

    handleClick = () => {
        this.setState({ shouldError: true });
    };

    render() {
        if (this.state.shouldError) {
            throw new Error('An intentional error!');
        }

        return (
            <div>
                <button onClick={this.handleClick}>Button Error</button>
            </div>
        );
    }
}
