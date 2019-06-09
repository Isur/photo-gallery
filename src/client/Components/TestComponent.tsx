import * as React from "react";
import { Button } from "semantic-ui-react";

type num = 2 | 3;

interface IProps {
  text: string,
  onFunc: () => void,
}

interface IState{
  empty: boolean,
  someNumber: num,
}

interface IS { x: boolean, y: boolean }

export default class TestComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      empty: false,
      someNumber: 3,
    };
  }

  componentDidMount(): void {
    this.setState({
      someNumber: 2,
    });
  }

  handleButtonOnClick = async (): Promise<void> => {
    const resp = await fetch("/api").then(r => r.json());
    alert(resp.test);
  }

  render(): React.ReactNode {
    const { text } = this.props;
    return (
      <div>
        Test?
        <Button content={text} onClick={this.handleButtonOnClick} />
      </div>
    );
  }
}
