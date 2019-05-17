import * as React from 'react'

type num = 2 | 3;

interface IProps {
  text: string,
}

interface ISta{
  empty: boolean,
}

interface IS { x: boolean, y: boolean }

export default class TestComponent extends React.Component<IProps,{}> {
  public x: num = 2;
  private _y: num = 3;

  render(): React.ReactNode {
    return (
      <div>
        {this.props.text}
      </div>
    )
  }
}
