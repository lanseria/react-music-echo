import React, { Component } from 'react'
import {Link} from 'react-router-dom' 

import Progress from '../progress/Progress'
import Lyric from '../lyric/Lyric'
import './Song.styl'

class Song extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       songword: ""
    }
  }
  
  fetchData = (musicid) => {
    fetch('https://ali-qqmusic.showapi.com/song-word?musicid='+musicid, {
      headers: {
        Authorization: 'APPCODE e909b37820ee487b9bd18592824fd666'
      }
    }).then(res=>res.json())
      .then(res=>{
        this.setState({
          songword: HtmlDecode(res.showapi_res_body.lyric)
        })
      })
  }
  componentDidMount = () => {
    this.fetchData(this.props.selectMusicItem.songid)
  }
  
  render() {
    const {selectMusicItem, playPause, 
      playing, played, onSeekMouseDown, 
      onSeekChange, onSeekMouseUp, currentMusicItem,
      renderPlayButton} = this.props
      const {songword} = this.state
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
          <div className="song-word">
            {songword && (
              <Lyric 
                text={songword}
              />
            )}
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

function HtmlDecode(str) { 
  var t = document.createElement("div"); 
  t.innerHTML = str; 
  return t.innerText;
}

export default Song