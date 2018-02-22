import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import View from './View';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.state = {
      size: 200,
      deleted: false,
      rotation: 0,
      expand: false
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  handleDelete(){
    this.setState({
      deleted: true
    });
  }

  handleRotate(){
    this.setState({
      rotation: this.state.rotation + 90
    });
  }

  handleExpand(){
    this.setState({
      expand: true
    });
  }

  render() {
    if(this.state.expand) return <View url={this.urlFromDto(this.props.dto)}/>
    if (this.state.deleted) return null;
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: `rotate(${this.state.rotation}deg`
        }}
      >
        <div className={''} style={{transform: `rotate(${-1*this.state.rotation}deg`}}>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={() => this.handleRotate()}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={() => this.handleDelete()}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={() => this.handleExpand()}/>
        </div>
      </div>
    );

  }
}

export default Image;
