import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styled from 'styled-components'

import TitleLink from '../TitleLink'
import Loading from '../Loading'
import RstContent from '../RstContent'
import SocialShare from './SocialShare'
import Metadata from './Metadata'
import ArticleComment from './ArticleComment'


const Base = styled.article`
  background: white;
  padding: 32px;
`

const Header = styled.header`
  h1 {
    margin: 3px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export default class Article extends React.PureComponent {
  static PropTypes = {
    summaryMode: PropTypes.bool,
    article: ImmutablePropTypes.contains({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      categories: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })).isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      modifiedDate: PropTypes.instanceOf(Date),
      content: PropTypes.any.isRequired,
      summary: PropTypes.string.isRequired
    }),
    socialConfig: ImmutablePropTypes.map,
    commentConfig: ImmutablePropTypes.map
  }

  renderHeader = () => {
    const {article} = this.props
    return (
      <Header>
        <h1><TitleLink to={`/articles/${article.get('slug')}/`}>{article.get('title')}</TitleLink></h1>
        {this.renderMetadata()}
      </Header>
    )
  }

  renderMetadata = () => {
    const {article} = this.props
    return (
      <Metadata
        categories={article.get('categories')}
        date={article.get('date')}
        modifiedDate={article.get('modifiedDate')} />
    )
  }

  renderSummary = () => {
    return <RstContent content={this.props.article.get('summary')}/>
  }

  renderContent = () => {
    const {article, socialConfig, commentConfig} = this.props
    return [
      <RstContent key="article-content" content={article.get('content')}/>,
      <SocialShare  key="social-share" config={socialConfig}/>,
      <ArticleComment key="comment" config={commentConfig}/>
    ]
  }

  render () {
    const {article, summaryMode} = this.props
    if (!article) {
      return (
        <Base>
          <Loading/>
        </Base>
      )
    }

    return (
      <Base>
        {this.renderHeader()}
        {summaryMode ? this.renderSummary() : this.renderContent()}
      </Base>
    )
  }
}

