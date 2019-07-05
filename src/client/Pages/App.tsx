import * as React from "react";
// import Gallery from "react-image-gallery";
import axios from "axios";
import { Loader, Dimmer, Icon } from "semantic-ui-react";
import _ from "lodash";
import "react-image-gallery/styles/scss/image-gallery.scss";
import Gallery from "react-photo-gallery";
import ReactBnbGallery from "react-bnb-gallery";
import "./App.scss";

interface IState {
  page: number,
  loading: boolean,
  galleryIsOpen: boolean,
  currentImage: number,
  images: MyImages,
}

type MyImages = {
  photo: string,
  src: string,
  width: number,
  height: number,
  subcaption: string,
  caption: string, }[];

interface IImage {
  original: string,
  thumbnail: string,
  thumbnailTitle?: string,
  thumbnailLabel?: string,
}

interface IProps {}
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};
export default class App extends React.Component<IProps, IState> {
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
      images: [],
    };
    this.refStart = React.createRef();
    this.refGallery = React.createRef();
    this.refDev = React.createRef();
    this.refLoc = React.createRef();
    this.refEnd = React.createRef();
  }
  
  async componentDidMount() {
    const response = await axios({
      method: "get",
      url: "/api/images/counter",
    });
    this.getPhotos(response.data.counter);
    window.addEventListener("scroll", _.debounce(this.handleScroll, 100));
    this.setState({ loading: false });
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getPhotos = async (count: number) => {
    for(let i = 0; i < count; i++) {
      const response = await axios({
        method: "get",
        url: `/api/images/${i}`,
      });
      const img = {
        src: `data:image/jpg;base64, ${response.data.image.base64}`,
        width: response.data.image.orientation === "portrait" ? 2 : 3,
        height: response.data.image.orientation === "portrait" ? 3 : 2,
        subcaption: response.data.image.title,
        caption: response.data.image.desc,
        photo: `data:image/jpg;base64, ${response.data.image.base64}`,
      };

      this.setState(state => ({ images: [...state.images, img] }));
    }
    await sleep(1000);
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
    const { page, loading, galleryIsOpen, currentImage, images } = this.state;
    if(images.length === 0 || loading) {
      return (
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>);
    }
    return (
      <div className="App">\
        {page > 0 && <div className="goUp">
          <Icon color="teal" name="angle double up" size="huge" onClick={this.handleScrollUp} />
        </div>}
        {page < 4 && <div className="goDown">
          <Icon color="teal" name="angle double down" size="huge" onClick={this.handleScrollDown} />
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
            <Gallery photos={images} onClick={(e, i) => this.handleToggleGallery(i.index)} />
          </div>
          <ReactBnbGallery photos={images}
                           show={galleryIsOpen}
                           onClose={this.handleToggleGallery}
                           activePhotoIndex={currentImage} />
        </div>

        <div className="header" ref={this.refDev}>
          <div className="header-01">
            <h1 className="header-02">
              <em> Lustrzanki: </em>
              <p>Nikon D5100</p>
              <p> Nikon D50 </p>
              <em> Obiektywy: </em>
              <p> AF-S DX NIKKOR 18-55mm f/3.5-5.6G VR </p>
              <p> AF-S Nikkor 18-70mm 1:3.5-4.5G ED </p>
              
            </h1>
          </div>
        </div>

        <div className="header" ref={this.refLoc}>
          <div className="header-01">
            <h1 className="header-02">
              Lokalizacja:
              <em>3 Stawy - Katowice</em>
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
