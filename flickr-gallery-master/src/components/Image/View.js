import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class View extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    shouldOpenView: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: this.props.shouldOpenView
    }

    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  gotoPrevious() {
  }

  componentDidMount() {
  this.setState({
    lightboxIsOpen: this.props.shouldOpenView
  });
  }

  componentWillReceiveProps(props) {
    this.setState({
      lightboxIsOpen: props.shouldOpenView
    });
  }

  gotoNext() {
  }

  closeLightbox() {
    this.setState({
      lightboxIsOpen: false
    });
  }

  render() {
    return (
      <Lightbox
    images={[{ src: this.props.url }]}
    isOpen={this.state.lightboxIsOpen}
    onClickPrev={this.gotoPrevious}
    onClickNext={this.gotoNext}
    onClose={this.closeLightbox}
    />
  )
  }
}

export default View;
