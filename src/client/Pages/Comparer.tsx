import React, { Component } from "react";
import ReactCompareImage from "react-compare-image";
import { IImage } from "./App";

interface IProps {
  image: IImage,
}

interface IState {

}
const PORTRAIT_STYLE = {
  maxHeight: "70vh",
  width: "auto",
};
  
const LANDSCAPE_STYLE = {
  maxWidth: "70vw",
  height: "auto",
};

export default class Comparer extends Component<IProps, IState> {
  componentDidUpdate(prop: IProps) {
    if(this.props !== prop) {
      this.forceUpdate();
    }
  }

  render() {
    const { image } = this.props;
    const style = image.width > image.height ? LANDSCAPE_STYLE : PORTRAIT_STYLE;
    return (
      <ReactCompareImage leftImage={image.srcedit}
                         leftImageCss={style}
                         rightImageCss={style}
                         leftImageLabel="BEFORE"
                         rightImageLabel="AFTER"
                         rightImage={image.src} hover />
    );
  }
}

