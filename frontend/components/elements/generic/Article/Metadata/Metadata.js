import React from 'react'
import NormalLink from '../../NormalLink'
import styled from '@emotion/styled'

import dateformat from 'dateformat'

const ItemGroup = styled.ul`
  font-size: 0.9rem;
  line-height: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Item = styled.li`
  display: inline;
  &:not(:first-of-type) {
    margin-left: 8px;
  }
`

const Categories = styled.ul`
  display: inline;
`

const Category = styled.li`
  margin: 0;
  display: inline;
  &:not(:first-of-type):before {
    content: "/";
    margin: 0 3px;
  }
`

const ChickenImage = styled.img`
  margin-bottom: -5px;

  &:hover {
    transform: rotate(-10deg);
  }
`

const Tooltip = styled.span`
  display: ${props => props.hover ? 'inline-block' : 'none'};
  position: absolute;
  line-height: 1.2em;
  padding: 4px;
  border-radius: 3px;
  background: ${props => props.theme.page.main.content.article.metadata.tip.background};
  color: ${props => props.theme.page.main.content.article.metadata.tip.color};
  
  transition: opacity .3s ease-out;
  
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -15px;
    top: 4px;
    border: 8px solid transparent;
    border-right-color: ${props => props.theme.page.main.content.article.metadata.tip.background};
  }
  
  @media (max-width: 800px) {
    display: none;
  }
`

export default class Metadata extends React.PureComponent {

  state = {
    hoverChickenImage: false
  }

  renderCategoryItem = (categories) => {
    return (
      <Item>分類：
        <Categories>
          {categories.map(category => (
            <Category key={category.slug}>
              <NormalLink href={`/articles/category/${category.slug}/`}>{category.name}</NormalLink>
            </Category>
          ))}
        </Categories>
      </Item>
    )
  }

  onMouseEnter = () => {
    this.setState({hoverChickenImage: true})
  }

  onMouseLeave = () => {
    this.setState({hoverChickenImage: false})
  }

  renderChickenCountItem = (chickenCount) => {
    const tooltip = '雞數：計算文長的常見計量單位，一般而言數字大小與文章長度呈正相關'
    return (
      <Item>字數：<ChickenImage src={'/img/chicken.png'} alt="雞" onMouseEnter={this.onMouseEnter}
                             onMouseLeave={this.onMouseLeave}/> x {chickenCount}<Tooltip
        hover={this.state.hoverChickenImage}>{tooltip}</Tooltip></Item>
    )
  }

  renderReleaseDateItem = (date) => {
    return (
      <Item>發表時間：{dateformat(date, 'yyyy/mm/dd')}</Item>
    )
  }

  renderModifiedDateItem = (modifiedDate) => {
    return (
      <Item>最後更新：{dateformat(modifiedDate, 'yyyy/mm/dd')}</Item>
    )
  }

  render() {
    return (
      <ItemGroup>
        {/*{this.renderCategoryItem(this.props.categories)}*/}
        {this.renderChickenCountItem(this.props.chickenCount)}
        {/*{this.renderReleaseDateItem(this.props.date)}*/}
        {/*{this.props.modifiedDate && this.renderModifiedDateItem(this.props.modifiedDate)}*/}
      </ItemGroup>
    )
  }
}

