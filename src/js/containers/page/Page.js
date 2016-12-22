import * as React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import * as pageActions from '../../ducks/page/actions'

import styles from './Page.scss'


export class Page extends React.Component {
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      content: React.PropTypes.content
    })
  }

  componentWillMount() {
    if (!this.props.page) {
      this.props.fetchPages()
    }
  }

  render() {
    const {page} = this.props
    if (!page) {
      return <article>讀取中……</article>
    }

    return (
      <article className={styles.root}>
        <div>
          <header className={styles.header}>
            <Link className={styles.link} to={`/${page.get('app')}/${page.get('slug')}/`}>{page.get('title')}</Link>
          </header>
        </div>
        <div dangerouslySetInnerHTML={{__html: page.get('content')}}/>
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.getIn(['page', 'items']).find(page => (
      page.get('app') === ownProps.params.app &&
      page.get('slug') === ownProps.params.slug
    ))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPages: () => dispatch(pageActions.fetchPages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
