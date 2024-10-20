import React, {Component, ReactNode} from "react";
import {GoSearch} from "react-icons/go";
import {Props} from "./Character";

interface MyComponentProps {
  sendDataToParent: (searchValue: string) => void;
}

interface MyComponentState {
  searchValue: string;
  data: Props[];
}

export default class Header extends Component<
  MyComponentProps,
  MyComponentState
> {
  constructor(props: MyComponentProps) {
    super(props);
    const initialValue = localStorage.getItem("searchValue");
    this.state = { searchValue: initialValue ?? "", data: [] };
  }

  changeSearchValue = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handlerSearch = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.setItem('searchValue', this.state.searchValue);
    this.props.sendDataToParent(this.state.searchValue);
  };

  fetchSeachData = async (value: string) => {
    const res = await fetch(`https://potterapi-fedeperin.vercel.app/en/characters?search=${value}`)
    return await res.json()
  }

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
              <GoSearch color={"red"}/>
            </button>
          </div>
        </>
    ) as ReactNode;
  }
}
