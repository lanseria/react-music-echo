import React, { Component } from 'react';
import './Volume.styl';

class Volume extends Component{
  render() {
    const {volume, setVolume}
     = this.props;
    return (
      <input className="volume"
        type='range' min={0} max={1} step='any'
        value={volume}
        onChange={setVolume}
      />
    )
  }
}

export default Volume;
