import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';
import InfiniteScroll from 'react-infinite-scroller';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      images: [],
      numOfImages: 100,
      galleryWidth: this.getGalleryWidth()
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  loadMore(pageToLoad){
    const newnumOfImages = this.state.numOfImages + pageToLoad*30;
    this.getImages(this.props.tag,newnumOfImages);
  }

  getImages(tag, numOfImages) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=${numOfImages}&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({images: res.photos.photo});
        }
      });
  }

  componentWillUnmount(){
    window.removeEventListener('resize',() => {this.setState({galleryWidth: document.body.clientWidth})});
  }

  componentDidMount() {
    window.addEventListener('resize',() => {this.setState({galleryWidth: document.body.clientWidth})});
    this.getImages(this.props.tag,this.state.numOfImages);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillReceiveProps(props) {
    this.getImages(props.tag,this.state.numOfImages);
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore.bind(this)}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
      <div className="gallery-root">
        {this.state.images.map(dto => {
          return <Image key={'image-' + dto.id} dto={dto} galleryWidth={this.state.galleryWidth}/>;
        })}
      </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
