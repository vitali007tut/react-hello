import React, {ReactNode} from "react";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import {Props} from "./components/Character";
import ErrorBoundary from "./components/ErrorBoundary";

type MyComponentProps = unknown;

interface MyComponentState {
    data: Props[] | null;
    loading: boolean;
    error: string | null;
    searchValue: string;
}

type Error = {
    name: string;
    message: string;
    stack?: string;
};

export default class App extends React.Component<
    MyComponentProps,
    MyComponentState
> {
    constructor(props: MyComponentProps) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            error: null,
            searchValue: localStorage.getItem("searchValue") ?? "",
        };
    }

    componentDidMount() {
        this.fetchData(this.state.searchValue);
    }

    fetchData = async (searchValue: string) => {
        this.setState({loading: true});
        try {
            const response = await fetch(
                `https://potterapi-fedeperin.vercel.app/en/characters?search=${searchValue}`,
            );
            if (!response.ok) {
                new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            this.setState({data, loading: false});
        } catch (error: unknown) {
            const typedError = error as Error;
            this.setState({error: typedError.message, loading: false});
        }
    };

    handleDataFromChild = (searchValue: string) => {
        this.fetchData(searchValue);
    };

    render() {
        const {data, loading, error} = this.state;

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <div className="App-container">
                <ErrorBoundary>
                <Header sendDataToParent={this.handleDataFromChild}/>
                <Section data={data ?? null} loading={loading}/>
                </ErrorBoundary>
            </div>
        ) as ReactNode;
    }
}
