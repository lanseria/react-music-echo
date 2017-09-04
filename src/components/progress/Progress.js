import React, { Component } from 'react';
import './Progress.styl';

class Progress extends Component{
  render() {
    const {played, onSeekChange, onSeekMouseDown, onSeekMouseUp}
     = this.props;
    return (
      <input
        type='range' min={0} max={1} step='any'
        value={played}
        onMouseDown={onSeekMouseDown}
        onChange={onSeekChange}
        onMouseUp={onSeekMouseUp}
      />
    )
  }
}

export default Progress;
