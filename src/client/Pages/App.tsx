import * as React from "react";
import axios from "axios";
import { Loader, Dimmer, Icon } from "semantic-ui-react";
import _ from "lodash";
import "react-image-gallery/styles/scss/image-gallery.scss";
import Gallery from "react-photo-gallery";
import ReactBnbGallery from "react-bnb-gallery";
import "./App.scss";
import Comparer from "./Comparer";

interface IState {
  page: number,
  loading: boolean,
  galleryIsOpen: boolean,
  currentImage: number,
  images: IImage[],
  comparer: boolean,
  sliderPosition: number,
}

export interface IImage {
  photo: string,
  src: string,
  srcedit: string,
  width: number,
  height: number,
  subcaption: string,
  caption: string, }

interface IProps {}

export default class App extends React.Component<IProps, IState> {
  refStart: React.RefObject<HTMLDivElement>;
  refGallery: React.RefObject<HTMLDivElement>;
  refComparer: React.RefObject<HTMLDivElement>;
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
      comparer: true,
      sliderPosition: 0.5,
    };
    this.refStart = React.createRef();
    this.refGallery = React.createRef();
    this.refComparer = React.createRef();
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
        src: `data:image/jpg;base64, ${response.data.image.base64Edited}`,
        srcedit: `data:image/jpg;base64, ${response.data.image.base64}`,
        width: response.data.image.orientation === "portrait" ? 2 : 3,
        height: response.data.image.orientation === "portrait" ? 3 : 2,
        subcaption: response.data.image.title,
        caption: response.data.image.desc,
        photo: `data:image/jpg;base64, ${response.data.image.base64Edited}`,
      };

      this.setState(state => ({ images: [...state.images, img] }));
    }
  }

  handleScroll = () => {
    if(window.pageYOffset > 0.5 * window.innerHeight + this.refLoc.current.offsetTop) {
      this.setState({ page: 5 });
    } else if(window.pageYOffset > 0.5 * window.innerHeight + this.refDev.current.offsetTop) {
      this.setState({ page: 4 });
    } else if(window.pageYOffset > 0.5 * window.innerHeight + this.refComparer.current.offsetTop) {
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
        window.scrollTo({ behavior: "smooth", top: this.refComparer.current.offsetTop });
        this.setState({ page: 2 });
        break;
      case 4:
        window.scrollTo({ behavior: "smooth", top: this.refDev.current.offsetTop });
        this.setState({ page: 3 });
        break;
      case 5:
        window.scrollTo({ behavior: "smooth", top: this.refLoc.current.offsetTop });
        this.setState({ page: 4 });
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
        window.scrollTo({ behavior: "smooth", top: this.refComparer.current.offsetTop });
        this.setState({ page: 2 });
        break;
      case 2:
        window.scrollTo({ behavior: "smooth", top: this.refDev.current.offsetTop });
        this.setState({ page: 3 });
        break;
      case 3:
        window.scrollTo({ behavior: "smooth", top: this.refLoc.current.offsetTop });
        this.setState({ page: 4 });
        break;
      case 4:
        window.scrollTo({ behavior: "smooth", top: this.refEnd.current.offsetTop });
        this.setState({ page: 5 });
        break;
      default: break;
    }
  }

  handleToggleGallery = (i = this.state.currentImage) => {
    this.setState(state => ({ galleryIsOpen: !state.galleryIsOpen, currentImage: i }));
  }

  handleCloseGaller = () => {
    this.setState({ galleryIsOpen: false });
  }

  handleNextPhoto = () => {
    this.setState(state => ({
      currentImage: state.currentImage === state.images.length - 1 ? 0 : state.currentImage + 1,
      sliderPosition: 0.5,
    }));
  }

  handlePreviousPhoto = () => {
    this.setState(state => ({
      currentImage: state.currentImage === 0 ? state.images.length - 1 : state.currentImage - 1,
      sliderPosition: 0.5,
    }));
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
        {page < 5 && <div className="goDown">
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
        <div className="header slid" ref={this.refComparer}>
          <Icon color="teal" name="chevron circle left" size="huge" onClick={this.handlePreviousPhoto} />
          <div className="slider" onClick={() => this.setState({ sliderPosition: 0.5 })}>
            <Comparer image={images[currentImage]} />
          </div>
          <Icon color="teal" name="chevron circle right" size="huge" onClick={this.handleNextPhoto} />
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
