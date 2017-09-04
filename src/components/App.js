import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import RES from '../res.json'

import Header from './header/Header'
import Footer from './footer/Footer'
import Player from './player/Player'
import Musicbar from './musicbar/Musicbar'
import Hotlist from './hotlist/Hotlist';
import Song from './song/Song';

import './App.styl'

const MUSIC_LIST = RES.showapi_res_body.pagebean.songlist

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      currentMusicItem: MUSIC_LIST[3]
    }
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
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
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  componentDidMount = () => {
    console.log(this.state.currentMusicItem);
    this.setState({
      url: this.state.currentMusicItem.url
    })
  }
  fetchData = () => {
    fetch('https://ali-qqmusic.showapi.com/top?topid=26', {
      headers: {
        Authorization: 'APPCODE e909b37820ee487b9bd18592824fd666'
      }
    }).then(res => {
      return res.json()
    }).then(res => {
      console.log(JSON.stringify(res));
    })
  }
  render() {
    const {
      url, playing, volume, muted,
      played, duration, currentMusicItem,
    } = this.state
    return (
      <Router>
        <div className="App">
          <Header songid={currentMusicItem.songid}/>
          <Route exact={true} path="/" render={()=>(
            <h1>HotList</h1>
          )} />
          <Route path="/s/:songId" render={({match})=>(
            <h1>{match.params.songId}</h1>
          )} />
          
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
            onEnded={() => this.setState({ playing: false })}
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
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
