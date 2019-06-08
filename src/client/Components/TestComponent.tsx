import * as React from "react";

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

  }

  render(): React.ReactNode {
    const { text, onFunc } = this.props;
    return (
      <div onClick={onFunc}>
        {text}
      </div>
    );
  }
}
