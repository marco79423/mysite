import React from 'react'

export default class MainLayout extends React.Component {

  render(){
    return (
      <div style={{background: 'green'}}>{this.props.children}</div>
    )
  }
}
