import React, { Component } from 'react'
import { version } from '../../../package.json'

import './Footer.styl'

class Footer extends Component {  
  render() {
    const SEPARATOR = ' · '
    return (
      <div className='footer'>
        Version <strong>{version}</strong>
        {SEPARATOR}
        <a href='https://github.com/Lanseria/react-player'>GitHub</a>
        {SEPARATOR}
        <a href='https://www.npmjs.com/package/react-player'>npm</a>
      </div>
    )
  }
}

export default Footer;