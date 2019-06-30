import * as React from "react";
import Gallery from "react-image-gallery";
import { Loader, Dimmer, Icon } from "semantic-ui-react";
import _ from "lodash";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "./App.scss";
import { images } from "../Components/images";

interface IState {
  page: number,
  loading: boolean,
}

interface IImage {
  original: string,
  thumbnail: string,
  thumbnailTitle?: string,
  thumbnailLabel?: string,
}

interface IProps {}

export default class App extends React.Component<IProps, IState> {
  images: IImage[];

  refStart: React.RefObject<HTMLDivElement>;

  refGallery: React.RefObject<HTMLDivElement>;

  refDev: React.RefObject<HTMLDivElement>;

  refEnd: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.state = {
      page: 0,
      loading: true,
    };
    this.refStart = React.createRef();
    this.refGallery = React.createRef();
    this.refDev = React.createRef();
    this.refEnd = React.createRef();
  }
  
  componentDidMount() {
    window.addEventListener("scroll", _.debounce(this.handleScroll, 100));
    this.images = images.map(img => ({
      original: img.src,
      thumbnail: img.src,
      caption: img.title,
      thumbnailTitle: img.title,
      description: img.desc,
    }));
    
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if(window.pageYOffset > 0.5 * window.innerHeight + this.refDev.current.offsetTop) {
      this.setState({ page: 3 });
    } else if(window.pageYOffset > 0.5 * window.innerHeight + this.refGallery.current.offsetTop) {
      this.setState({ page: 2 });
    } else if(window.pageYOffset > 0.5 * window.innerHeight + this.refStart.current.offsetTop) {
      this.setState({ page: 1 });
    } else {
      this.setState({ page: 0 });
    }
  }

  handleScrollUp = () => {
    const { page } = this.state;
    switch(page) {
      case 1:
        window.scrollTo({ behavior: "smooth", top: this.refStart.current.offsetTop });
        this.setState({ page: 0 });
        break;
      case 2:
        window.scrollTo({ behavior: "smooth", top: this.refGallery.current.offsetTop });
        this.setState({ page: 1 });
        break;
      case 3:
        window.scrollTo({ behavior: "smooth", top: this.refDev.current.offsetTop });
        this.setState({ page: 2 });
        break;
      default: break;
    }
  }

  handleScrollDown = () => {
    const { page } = this.state;
    switch(page) {
      case 0:
        window.scrollTo({ behavior: "smooth", top: this.refGallery.current.offsetTop });
        this.setState({ page: 1 });
        break;
      case 1:
        window.scrollTo({ behavior: "smooth", top: this.refDev.current.offsetTop });
        this.setState({ page: 2 });
        break;
      case 2:
        window.scrollTo({ behavior: "smooth", top: this.refEnd.current.offsetTop });
        this.setState({ page: 3 });
        break;
      default: break;
    }
  }

  render(): React.ReactNode {
    const { page, loading } = this.state;
    if(this.images == undefined || loading) {
      return (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>);
    }
    return (
      <div className="App">\
        {page > 0 && <div className="goUp">
          <Icon color="teal" name="angle double up" size="massive" onClick={this.handleScrollUp} />
        </div>}
        {page < 3 && <div className="goDown">
          <Icon color="teal" name="angle double down" size="massive" onClick={this.handleScrollDown} />
        </div>}
        <div className="header" ref={this.refStart}>
          <div className="header-01">
            <h1 className="header-02">
            Informatyka, MS
              <em>Fotografia</em>
            Projekt
            </h1>
          </div>
        </div>

        <div className="gallery" ref={this.refGallery}>
          <div className="gal">
            <Gallery items={this.images}
                     defaultImage="/public/placeholder.png"
                     showIndex />
          </div>
        </div>

        <div className="header" ref={this.refDev}>
          <div className="header-01">
            <h1 className="header-02">
            Sprzęt
              <em>CANON 700D</em>
              <p> Ogniskowa </p>
              <p> Jakiś </p>
              <p> Jakis parametr </p>
              <p> Jakis parametr 2 </p>
            </h1>
          </div>
        </div>

        <div className="header" ref={this.refEnd}>
          <div className="header-01">
            <h1 className="header-02">
              Twórcy:
              <em>ARTUR</em>
              <em>BEDNARCZYK</em>
              <em>DAWID</em>
              <em>GRAJEWSKI</em>
            </h1>
          </div>
        </div>

      </div>
      
    );
  }
}
