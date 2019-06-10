import * as React from "react";
import { Header } from "semantic-ui-react";
import ReactGA from "react-ga";
import config from "../../config";
import TestComponent from "../Components/TestComponent";
import "./App.scss";

interface IState {}

interface IProps {}

export default class App extends React.Component<IProps, IState> {
  componentDidMount() {
    ReactGA.initialize(config.googleTrackerID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleFunc = (): void => {
    alert("Hi!");
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <Header as="h1" className="header" content="This is react / node boilerplate" />
        <img src="/public/images/ai.jpg" alt="AI" onClick={this.handleFunc} />
        <TestComponent text="This is test component" onFunc={this.handleFunc} />
      </div>
    );
  }
}
