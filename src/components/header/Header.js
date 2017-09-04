import React from 'react';
import { NavLink } from 'react-router-dom'

import './header.styl';
import logo from './logo.png';

const Header = (props) => (
  <div className="header row">
    <img className="-col-auto" width="40" src={logo} alt="logo" />
    <h1 className="caption">React Music Player</h1>
    <NavLink
      exact={true}
      to="/"
      activeClassName="active" 
      className="hotlist"
    >热门榜单</NavLink>
    <NavLink
    to={`/s/${props.songid}`}
      activeClassName="active" 
      className="song"
    >歌曲</NavLink>
  </div>
)

export default Header;
