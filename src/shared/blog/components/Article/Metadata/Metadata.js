import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import NormalLink from '../../generic/NormalLink'
import styled from 'styled-components'

import dateformat from 'dateformat'

const ItemGroup = styled.ul`
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Item = styled.li`
  display: inline;
  &:not(:first-child) {
    margin-left: 8px;
  }
`

const Categories = styled.ul`
  display: inline;
`

const Category = styled.li`
  margin: 0;
  display: inline;
  &:not(:first-child):before {
    content: "/";
    margin: 0 3px;
  }
`

export default class Metadata extends React.PureComponent {
  static PropTypes = {
    categories: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    modifiedDate: PropTypes.instanceOf(Date)
  }

  renderCategoryItem = (categories) => {
    return (
      <Item>分類：
        <Categories>
          {categories.map(category => (
            <Category key={category.get('slug')}>
              <NormalLink to={`/articles/category/${category.get('slug')}/`}>{category.get('name')}</NormalLink>
            </Category>
          ))}
        </Categories>
      </Item>
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

  render () {
    return (
      <ItemGroup>
        {this.renderCategoryItem(this.props.categories)}
        {this.renderReleaseDateItem(this.props.date)}
        {this.props.modifiedDate && this.renderModifiedDateItem(this.props.modifiedDate)}
      </ItemGroup>
    )
  }
}

