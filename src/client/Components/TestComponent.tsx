import * as React from 'react'

interface IProps {
    text: string,
}

export default class TestComponent extends React.Component<IProps,any> {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    )
  }
}
