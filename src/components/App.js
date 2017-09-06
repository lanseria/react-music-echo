import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import _ from 'lodash'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import {saveToLocal, loadFromLocal} from '../common/js/store'

import RES from '../res.json'
import musicMap from '../mmap.json'

import Header from './header/Header'
import Footer from './footer/Footer'
import Musicbar from './musicbar/Musicbar'
import Musiclist from './musiclist/Musiclist'
import Hotlist from './hotlist/Hotlist';
import Song from './song/Song';

import './App.styl'

const MUSIC_LIST = {
  id: 1,
  name: 'defult',
  list: RES.showapi_res_body.pagebean.songlist
}

var online_MUSIC_LIST = []

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      index: 0,
      musicListAll: null,
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST.list[0],
      showList: false
    }
  }
  loadList = (nowlist) => {
    this.setState({
      musicList: nowlist
    })
    this.loadMusic(nowlist.list[0])
  }
  loadMusic = (nowmusic) => {
    const { musicList} = this.state
    const index = _.findIndex(musicList, o=>
      o.songid===nowmusic.songid
    )
    this.setState({
      index,
      url: nowmusic.url,
      played: 0,
      loaded: 0,
      playing: true,
      currentMusicItem: nowmusic
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  next = () => {
    const {index, musicList} = this.state
    if(index===musicList.length-1){
      this.loadMusic(0)
    }else{
      this.loadMusic(musicList[index+1])
    }
  }
  prev = () => {
    const {index, musicList} = this.state
    if(index===0){
      this.loadMusic(musicList.length-1)
    }else{
      this.loadMusic(musicList[index-1])
    }
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  showList = () => {
    this.setState({
      showList: !this.state.showList
    })
  }
  renderLoadButton = (songid) => {
    const nowmusic = _.find(this.state.musicList.list, o=>
      o.songid===parseInt(songid, 10)
    )
    return (
      <a onClick={() => this.loadMusic(nowmusic)}>
        {`${nowmusic.songname}-${nowmusic.singername}`}
      </a>
    )
  }
  renderPlayListBtn = (listid) => {
    const nowlist = _.find(this.state.musicListAll, o=>
      o.id===parseInt(listid, 10)
    )
    return (
      <a onClick={() => this.loadList(nowlist)}>
        <div className="black-mask">
        </div>
        <div className="text">
          <h4>{nowlist.name}</h4>
          <span className="chn-music">300</span>
          <span className="chn-comment">18548</span>
          <span className="chn-color">14737632</span>
        </div>
        
      </a>
    )
  }
  renderPlayButton = (songid) => {
    const nowmusic = _.find(this.state.musicList, o=>
      o.songid===parseInt(songid, 10)
    )
    return (
      <div onClick={() => this.loadMusic(nowmusic)}className={"play icon-play2"}>
      </div>
    )
  }
  
  
  componentDidMount = () => {
    this.setState({
      url: this.state.currentMusicItem.url
    })
    this.fetchData()
  }
  componentWillUnmount = () => {
    
  }
  
  fetchData = () => {
    online_MUSIC_LIST.push(MUSIC_LIST)
    musicMap.cussort.map((m) => {
      return fetch('https://ali-qqmusic.showapi.com/top?topid='+m.id, {
        headers: {
          Authorization: 'APPCODE e909b37820ee487b9bd18592824fd666'
        }
      })
      .then(res => res.json())
      .then(res => {
        online_MUSIC_LIST.push({
          id:m.id,
          name: m.name,
          list:res.showapi_res_body.pagebean.songlist
        })
      })
    })
    this.setState({
      musicListAll: online_MUSIC_LIST
    })
  }
  render() {
    const {
      url, playing, volume, muted,
      played, duration, currentMusicItem,
      musicList, showList, musicListAll
    } = this.state
    return (
      <Router>
        <div className="App">
          <Header songid={currentMusicItem.songid}/>
          <div className="container">
            <Route exact={true} path="/" render={()=>(
              <Hotlist 
                musicMap={musicMap}
                musicListAll={musicListAll}
                renderPlayListBtn={this.renderPlayListBtn}
              />
            )} />
            <Route path="/s/:songId" render={({match})=>{
              const selectMusicItem = _.find(musicList.list, o=>o.songid === parseInt(match.params.songId, 10))
              return (
                <Song 
                  playPause={this.playPause}
                  playing={playing}
                  played={played}
                  onSeekMouseDown={this.onSeekMouseDown}
                  onSeekChange={this.onSeekChange}
                  onSeekMouseUp={this.onSeekMouseUp}
                  selectMusicItem={selectMusicItem} 
                  currentMusicItem={currentMusicItem}
                  renderPlayButton={this.renderPlayButton}
                />
              )
            }
          } />
          </div>
          <ReactPlayer
            ref={player => { this.player = player }}
            className='react-player'
            width='100%'
            height='100%'
            url={url}
            playing={playing}
            volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={() => this.setState({ playing: true })}
            onPause={() => this.setState({ playing: false })}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={this.next}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={duration => this.setState({ duration })}
          />
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
            showList={this.showList}
            next={this.next}
            prev={this.prev}
          />
          <Musiclist 
            renderLoadButton={this.renderLoadButton}
            showList={showList}
            musicList={musicList}
            currentMusicItem={currentMusicItem}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
