import React, { Component } from 'react'
import _ from 'lodash'

import './Lyric.styl'

class Lyric extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lyricObj: {},
      lys: []
    }
  }
  strToLyric = () => {
    const { text } = this.props
    var lyricObj = {};
    lyricObj.lyrics = [];
    if (text === []) {
      return;
    }
    var textArr = text && text.split('\n')
    textArr.forEach((text) => {
      if (checkPeer(text)) {
        const propsAndVal = text.replace(/\[/, "").replace(/\]/, "").split(':')
        lyricObj[propsAndVal[0]] = propsAndVal[1]
      } else {
        if (/\[\d{1,2}:\d{1,2}\.\d{1,2}\]/.test(text.substr(0, 10))) {
          lyricObj.lyrics.push({
            time: text.substr(1, 8),
            data: text.substr(10)
          })
        } else if (/\[\d{1,2}:\d{1,2}\]/.test(text.substr(0, 7))) {
          lyricObj.lyrics.push({
            time: text.substr(1, 5) + ".00",
            data: text.substr(7)
          })
        }
      }
    })
    var lys = [{}] && lyricObj.lyrics
    _.sortBy(lys, ['time']);
    this.setState({
      lyricObj,
      lys
    })
  }
  componentDidMount = () => {
    this.strToLyric()
  }

  render () {
    const { lyricObj, lys } = this.state
    if (lyricObj === {} || lys === []) {
      return;
    }
    return (
      <div className="lyrics">
        {lys.map((l, i) => (
          <li key={i}>{l.data}</li>
        ))}
      </div>
    )
  }
}
function checkPeer (str) {
  if (str.charAt(0) === '[' && str.charAt(str.length - 1) === ']' && !/\[\d{1,2}/.test(str.substr(0, 3))) {
    return true
  } else {
    return false
  }
}
export default Lyric