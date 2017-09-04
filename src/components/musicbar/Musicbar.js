import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Progress from '../progress/Progress'
import Duration from '../duration/Duration'
import Volume from '../volume/Volume'

import './Musicbar.styl'
import '../../common/stylus/icon.styl'

class Musicbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  render() {
    const {currentMusicItem, duration, played,
      onSeekMouseDown,onSeekChange,onSeekMouseUp,
      playPause, playing, volume, setVolume,
      toggleMuted, muted
    } = this.props;
    return (
      <div className="controlPlay">
        <div className="control">
          <i className="prev icon-previous"></i>
          <i className="next icon-next"></i>
          <div onClick={playPause} className={"play "+(playing ? "icon-pause":"icon-play2")}></div>
        </div>
        <div className="main">
          <div className="songPic">
            <Link to={`/s/${currentMusicItem.songid}`}>
              <img src={currentMusicItem.albumpic_small} alt="" />
            </Link>
          </div>
          <div className="info">
            <h2 className="songInfo">
              {currentMusicItem.songname}-{currentMusicItem.singername}
            </h2>
            <div className="progress" style={{display: "flex"}}>
              <Duration seconds={duration * played} />
              <Progress
                played={played}
                onSeekMouseDown={onSeekMouseDown}
                onSeekChange={onSeekChange}
                onSeekMouseUp={onSeekMouseUp}
              />
              <Duration seconds={duration * (1 - played)} />
            </div>
          </div>
        </div>
        <div className="someBtn">
          <i className="icon-loop2"></i>
          <i className="icon-favorite"></i>
          <label>
            <input type='checkbox' checked={muted} onChange={toggleMuted} /> 
            <i className={muted ? "icon-volume-mute2" : "icon-volume-medium"}
          ></i>
          </label>
          <Volume volume={volume}
          setVolume={setVolume}
          />
          <i className="musiclist icon-file-music"></i>
        </div>
      </div>
    )
  }
  
}

export default Musicbar