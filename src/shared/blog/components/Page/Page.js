import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from '../../../generic/components/Link/index'

import Loading from '../Loading/index'
import RstContent from '../RstContent/index'

import styles from './Page.scss'

export default class Page extends React.PureComponent {
  static PropTypes = {
    page: ImmutablePropTypes.contains({
      app: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.content
    })
  }

  render () {
    const {page} = this.props
    if (!page) {
      return (
        <section className={styles.page}>
          <Loading/>
        </section>
      )
    }

    return (
      <section className={styles.page}>
        <article>
          <div>
            <header>
              <h1><Link to={`/${page.get('app')}/${page.get('slug')}/`}>{page.get('title')}</Link></h1>
            </header>
          </div>
          <RstContent content={page.get('content')}/>
        </article>
      </section>
    )
  }
}
