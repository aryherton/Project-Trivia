import React, { Component } from 'react';
import video from '../video/erro.mp4';

class VideoError extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: true,
    };
  }

  componentDidMount() {
    this.changeLoad();
  }

  changeLoad = () => {
    const maxTimeOut = 2000;
    setTimeout(() => {
      this.setState({ load: false });
    }, maxTimeOut);
  }

  render() {
    const { load } = this.state;

    return (
      load && (
        <video width="320" height="240" autoPlay>
          <track kind="captions" />
          <source src={ video } type="video/mp4" />
        </video>
      )
    );
  }
}

export default VideoError;
