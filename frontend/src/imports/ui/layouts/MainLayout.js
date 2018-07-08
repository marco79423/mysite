import React from 'react'

import style from './MainLayout.scss'

export default class MainLayout extends React.Component {

  render(){
    return (
      <div className={style.root}>{this.props.children}</div>
    )
  }
}
