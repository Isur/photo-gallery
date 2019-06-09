import * as React from "react";
import { Button } from "semantic-ui-react";

type num = 2 | 3;

interface IProps {
  text: string,
  onFunc: () => void,
}

interface IState{
  someNumber: num,
}

export default class TestComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      someNumber: 3,
    };
  }

  handleButtonOnClick = async (): Promise<void> => {
    const resp = await fetch("/api").then(r => r.json());
    alert(resp.test);
  }

  render(): React.ReactNode {
    const { text } = this.props;
    return (
      <div>
        <Button content={text} onClick={this.handleButtonOnClick} />
      </div>
    );
  }
}
