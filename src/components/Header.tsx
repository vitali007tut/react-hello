import React, { Component, ReactNode } from "react";
import { GoSearch } from "react-icons/go";
import { Props } from "./Character";
import ErrorButton from "./ErrorButton";

interface MyComponentProps {
  sendDataToParent: (searchValue: string) => void;
}

interface MyComponentState {
  searchValue: string;
  data: Props[];
  errorArr: [];
}

export default class Header extends Component<
  MyComponentProps,
  MyComponentState
> {
  constructor(props: MyComponentProps) {
    super(props);
    const initialValue = localStorage.getItem("searchValue");
    this.state = { searchValue: initialValue ?? "", data: [], errorArr: [] };
  }

  changeSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handlerSearch = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const trimmedValue = this.state.searchValue.trim()
    localStorage.setItem("searchValue", trimmedValue);
    this.props.sendDataToParent(trimmedValue);
  };

  render() {
    return (
      <>
        <h1>Harry Potter Characters</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or nickname.."
            name="search"
            value={this.state.searchValue}
            onChange={this.changeSearchValue}
          />
          <button onClick={this.handlerSearch}>
            <GoSearch color={"red"} />
          </button>
        </div>
        <ErrorButton/>
      </>
    ) as ReactNode;
  }
}
