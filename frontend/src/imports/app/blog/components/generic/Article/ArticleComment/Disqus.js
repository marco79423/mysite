import React from 'react'
import PropTypes from 'prop-types'

export default class Disqus extends React.Component {
  static PropTypes = {
    /**
     * ref: https://github.com/mzabriskie/react-disqus-thread/blob/master/lib/components/DisqusThread.js
     * ref: https://github.com/disqus/DISQUS-API-Recipes/blob/master/snippets/js/disqus-reset/disqus_reset.html
     */
    shortname: PropTypes.string.isRequired,
  }

  componentDidMount () {
    this.loadDisqus()
  }

  componentDidUpdate () {
    this.loadDisqus()
  }

  loadDisqus = () => {
    // If Disqus has already been added, reset it
    if (typeof window.DISQUS !== 'undefined') {
      window.DISQUS.reset({
        reload: true,
        config: function config () {
          this.page.url = this.page.url.replace(/#/, '') + '#!newthread'
        }
      })
    } else { // Otherwise add Disqus to the page
      const child = document.createElement('script')
      child.async = true
      child.type = 'text/javascript'
      child.src = '//' + this.props.shortname + '.disqus.com/embed.js'

      const parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
      parent.appendChild(child)
    }
  }

  render () {
    return (
      <div>
        <div id="disqus_thread"/>
        <a href="http://disqus.com" className="dsq-brlink">
          Blog comments powered by <span className="logo-disqus">Disqus</span>.
        </a>
      </div>
    )
  }
}
