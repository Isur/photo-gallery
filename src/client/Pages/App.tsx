import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import TestComponent from '../Components/TestComponent';
import "./App.scss";
import * as ai from "../../public/images/ai.png";

export default class App extends React.Component{
  render() {
      console.log({file: ai});
    return (
      <div className="app">
        This is test app. xD huehue
        <img src={ai} alt="AI" /> <Menu> <Menu.Item content="test" /> </Menu>
        <TestComponent text="lul" />
      </div>
    )
  }
}
