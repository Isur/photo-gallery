import * as React from "react";
// import Gallery from "react-image-gallery";
import { Loader, Dimmer, Icon } from "semantic-ui-react";
import _ from "lodash";
import "react-image-gallery/styles/scss/image-gallery.scss";
import Gallery from "react-photo-gallery";
import ReactBnbGallery from "react-bnb-gallery";
import "./App.scss";
import { images } from "../Components/images";

interface IState {
  page: number,
  loading: boolean,
  galleryIsOpen: boolean,
  currentImage: number,
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

  images2: { photo: string, src: string, width: number, height: number }[];

  refStart: React.RefObject<HTMLDivElement>;

  refGallery: React.RefObject<HTMLDivElement>;

  refDev: React.RefObject<HTMLDivElement>;

  refLoc: React.RefObject<HTMLDivElement>;

  refEnd: React.RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);

    this.state = {
      page: 0,
      loading: true,
      galleryIsOpen: false,
      currentImage: 0,
    };
    this.refStart = React.createRef();
    this.refGallery = React.createRef();
    this.refDev = React.createRef();
    this.refLoc = React.createRef();
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
      originalClass: "originalImage",
      thumbnailClass: "thumbnailImage",
    }));
    this.images2 = images.map((img, index) => ({
      photo: img.src,
      number: index,
      caption: img.desc,
      subcaption: img.title,
      width: img.orientation === "portrait" ? 2 : 3,
      height: img.orientation === "portrait" ? 3 : 2,
      src: img.src,
    }));
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if(window.pageYOffset > 0.5 * window.innerHeight + this.refLoc.current.offsetTop) {
      this.setState({ page: 4 });
    } else if(window.pageYOffset > 0.5 * window.innerHeight + this.refDev.current.offsetTop) {
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
      case 4:
        window.scrollTo({ behavior: "smooth", top: this.refLoc.current.offsetTop });
        this.setState({ page: 3 });
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
        window.scrollTo({ behavior: "smooth", top: this.refLoc.current.offsetTop });
        this.setState({ page: 3 });
        break;
      case 3:
        window.scrollTo({ behavior: "smooth", top: this.refEnd.current.offsetTop });
        this.setState({ page: 4 });
        break;
      default: break;
    }
  }

  handleToggleGallery = (i = this.state.currentImage) => {
    this.setState(state => ({ galleryIsOpen: !state.galleryIsOpen, currentImage: i }));
  }

  render(): React.ReactNode {
    const { page, loading, galleryIsOpen, currentImage } = this.state;
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
        {page < 4 && <div className="goDown">
          <Icon color="teal" name="angle double down" size="massive" onClick={this.handleScrollDown} />
        </div>}
        <div className="header" ref={this.refStart}>
          <div className="header-01">
            <h1 className="header-02">
            Makro
              <em>Fotografia</em>
            Natura
            </h1>
          </div>
        </div>

        <div className="gallery" ref={this.refGallery}>
          <div className="gal">
            <Gallery photos={this.images2} onClick={(e, i) => this.handleToggleGallery(i.index)} />
          </div>
          <ReactBnbGallery photos={this.images2}
                           show={galleryIsOpen}
                           onClose={this.handleToggleGallery}
                           activePhotoIndex={currentImage} />
        </div>

        <div className="header" ref={this.refDev}>
          <div className="header-01">
            <h1 className="header-02">
            Sprzęt
              <em>Nikon D5100</em>
              <p> Matryca: 16,2 Mpix </p>
              <em> Obiektyw: </em>
              <p> Ogniskowa: </p>
              
            </h1>
          </div>
        </div>

        <div className="header" ref={this.refLoc}>
          <div className="header-01">
            <h1 className="header-02">
              Lokalizacja:
              <em>Park w ...</em>
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
