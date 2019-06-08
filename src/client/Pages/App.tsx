import * as React from "react";
import { Menu } from "semantic-ui-react";
import TestComponent from "../Components/TestComponent";
import "./App.scss";
// import * as ai from "../../public/images/ai.png";

interface IState {
  test: number,
}

export default class App extends React.Component<{}, IState> {
  ref: React.Ref<HTMLDivElement>

  constructor(props: {}) {
    super(props);

    this.state = {
      test: 1,
    };
  }

  componentDidMount(): void{

  }

  x = (): number => {
    const a = 2;
    return a;
  }

  y(a: string): string {
    return a;
  }

  handleFunc = (): void => {
    alert("heh, ai");
  }

  render(): React.ReactNode {
    const { test: xD } = this.state;
    const y = this.x();
    const x = 4;
    return (
      <div className="app">
        This is test app. xD huehue
        <img src="/public/images/ai.png" alt="AI" onClick={this.handleFunc} />
        <Menu>
          <Menu.Item content="test" />
        </Menu> test <TestComponent text="lul" onFunc={this.handleFunc} /> {x};
        <div> {y} </div>
        {xD}
      </div>
    );
  }
}
