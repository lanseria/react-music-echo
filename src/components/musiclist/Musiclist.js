import React, { Component } from 'react'


import './Musiclist.styl'
import '../../common/stylus/icon.styl'

class Musiclist extends Component {
  
  render() {
    const { showList, musicList, currentMusicItem, renderLoadButton } = this.props
    return (
      <div className={`m-list ${showList ? "active" : ""}` }>
        <div className="list-header">
          <h1 className="title">歌曲列表</h1>
          <span className="empty">清空</span>
        </div>
        <div className="list-content">
          <ul>
            {musicList.list.map((music) => (
              <li key={music.songid}>
                <h1 className={`song ${currentMusicItem.songid===music.songid ? "active" : ""}`}>
                
                {currentMusicItem.songid===music.songid ? 
                  `${music.songname}-${music.singername}-正在播放` : 
                  renderLoadButton(music.songid)
                }
                </h1>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}



export default Musiclist