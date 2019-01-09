import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const Label = styled.label`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
`


const Tick = styled.div`
  width: 100%;
  height: 100%;
  transition: all 1.1s cubic-bezier(.19, 1, .22, 1);
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:after {
    width: 50%;
    height: 20%;
    content: '';
    position: absolute;
    border-left: 0.3rem solid;
    border-bottom: 0.3rem solid;
    border-color: #065A76;
    transform: rotate(-45deg) translate3d(0, 0, 0);
    transform-origin: center center;
    transition: all 1.1s cubic-bezier(.19, 1, .22, 1);
    left: 0;
    right: 0;
    top: 200%;
    bottom: 5%;
    margin: auto;
  }
`

const Input = styled.input.attrs({type: 'checkbox'})`
  display: none;
  &:checked + ${Tick} {
    &:after {
      top: 0;
    }
  }
`


export default class Checkbox extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    setChecked: PropTypes.func.isRequired
  }

  onChange = (e) => {
    this.props.setChecked(e.target.checked)
  }

  render () {
    return (
      <Label>
        <Input checked={this.props.checked} onChange={this.onChange}/>
        <Tick />
      </Label>
    )
  }
}
