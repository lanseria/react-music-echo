import React, { Component } from 'react'
import {Link} from 'react-router-dom' 

import Progress from '../progress/Progress'
import './Song.styl'

class Song extends Component {
  render() {
    const {selectMusicItem, playPause, 
      playing, played, onSeekMouseDown, 
      onSeekChange, onSeekMouseUp, currentMusicItem,
      renderPlayButton} = this.props
    return (
      <div className="song-main">
        <nav>
          <Link to="/" className="back icon-circle-left">
            返回
          </Link>
        </nav>
        <div className="song-title">
          <h4>
            {`${selectMusicItem.songname}-${selectMusicItem.singername}`}
          </h4>
        </div>
        <div className="song-bullets">
          <div className="bg-mask-wp">
            <img src={selectMusicItem.albumpic_big} alt={selectMusicItem.songname} />
            <div className="bg-mask"></div>
          </div>  
          <div className="song-cover">
            <img src={selectMusicItem.albumpic_big} alt={selectMusicItem.songname} />
          </div>
        </div>
        {currentMusicItem.songid===selectMusicItem.songid ? (
          <div className="control">
            <div onClick={playPause} className={"play "+(playing ? "icon-pause":"icon-play2")}></div>
            <Progress
              played={played}
              onSeekMouseDown={onSeekMouseDown}
              onSeekChange={onSeekChange}
              onSeekMouseUp={onSeekMouseUp}
            />
          </div>
        ) : (
          <div className="control">
            {renderPlayButton(selectMusicItem.songid)}
            <Progress
            />
          </div>
        )}
      </div>
    )
  }
}
export default Song