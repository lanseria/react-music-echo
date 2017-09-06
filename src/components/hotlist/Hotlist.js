import React, { Component } from 'react'
import _ from 'lodash'
import './Hotlist.styl'

class Hotlist extends Component {
  
  render() {
    const { musicMap, musicListAll,
      renderPlayListBtn } = this.props
    const mmap = musicMap.cussort
    return (
      <div className="hot-main">
        <nav className="nav">
          <ul>
            <li><a href="#default">默认</a></li>
            {mmap.map(m=>(
              <li key={m.id}>
                <a href={`#${m.id}`}>
                  {m.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="content">
          <ul>
            {musicListAll && musicListAll && musicListAll.map(m=>{
              return (
                <Li 
                  renderPlayListBtn={renderPlayListBtn}
                  mk={m.id}
                  key={m.id}
                  musics={m.list.slice(0, 6)}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}


class Li extends Component {
  render() {
    const {mk, renderPlayListBtn, musics} = this.props
    return (
      <li className="li-img">
      <div className="eu" id={mk}>
        <div className="chn-left-content">
          {renderPlayListBtn(mk)}
        </div>
        <div className="chn-right-content">
          <h1>热门歌曲</h1>
          <div className="songlist">
            <ul>
              {musics.map((music)=>(
                <li key={music.songid}>
                  <img src={music.albumpic_small} alt={music.songname}/>
                  <h4>{music.songname}</h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
      </div>
    </li>
    )
  }
}


export default Hotlist