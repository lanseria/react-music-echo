import React, { Component } from 'react'

import Musicbar from '../musicbar/Musicbar'

import './Player.styl'

class Player extends Component {

  render() {
    const {
      playing, volume, muted,
      played, duration, currentMusicItem
    } = this.props
    return (
      <div className='player-wrapper'>
        <Musicbar
          onSeekMouseDown={this.onSeekMouseDown}
          onSeekChange={this.onSeekChange}
          onSeekMouseUp={this.onSeekMouseUp}
          currentMusicItem={currentMusicItem}
          duration={duration}
          played={played}
          playPause={this.playPause}
          playing={playing}
          volume={volume}
          setVolume={this.setVolume}
          toggleMuted={this.toggleMuted}
          muted={muted}
        />
      </div>
    )
  }
}

export default Player 