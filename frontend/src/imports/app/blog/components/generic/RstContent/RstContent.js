import React from 'react'
import PropTypes from 'prop-types'
import styled, {injectGlobal, withTheme} from 'styled-components'

import pygmentsStyle from './pygmentsStyle'

const Base = styled.div`
  margin-top: 16px;
  font-size: 1.2rem;
  line-height: 1.6rem;
`

export class RstContent extends React.PureComponent {
  static PropTypes = {
    theme: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired
  }

  injectGlobalStyle = () => {
    injectGlobal`
      .rst-content {
        ${pygmentsStyle}
        
        hr {
          border: solid #dddddd;
          border-width: 1px 0 0;
          clear: both;
          margin: 1.25rem 0 1.1875rem;
          height: 0;
        }
      
        a, a:visited, a:hover {
          color: ${this.props.theme.global.link.color};
          text-decoration: none;
        }
      
        header {
          margin-bottom: 2rem;
      
          h1 {
            font-size: 2rem;
            margin-top: 0;
            margin-bottom: 0;
          }
      
          .meta {
            margin-top: 15px;
      
            .rubric {
              color: #d65b4b;
              font-weight: bold;
            }
          }
        }
      
        h2, h3, h4, h5 {
          color: ${this.props.theme.page.main.content.article.header.color};
        }
      
        h2 {
          font-size: 1.8rem;
        }
      
        h3 {
          font-size: 1.5rem;
        }
      
        h4 {
          font-size: 1.3rem;
        }
      
        h5 {
          font-size: 1.2rem;
        }
      
        ul {
          font-size: 1.2rem;
          margin-left: 1.2rem;
          li {
            margin-left: 1.2rem;
          }
        }
      
        ol {
          font-size: 1.2rem;
          margin-left: 1.2rem;
          li {
            margin-left: 1.2rem;
          }
        }
      
        p {
          color: rgb(26, 26, 26);
          font-size: 1.2rem;
          line-height: 1.8rem;
      
          &.rubric {
            font-weight: bold;
            font-size: larger;
            color: #d65b4b;
          }
        }
      
        pre {
          font-size: 1.2rem;
          font-family: Consolas, Arial, Microsoft JhengHei;
          color: ${this.props.theme.page.main.content.article.block.color};
          background: ${this.props.theme.page.main.content.article.block.background};
          border: 1px solid ${this.props.theme.page.main.content.article.block.borderColor};
          padding: 0.7rem;
          margin-bottom: 1rem;
          white-space: pre-wrap;
      
          &.doctest-block {
            border: 0;
            color: ${this.props.theme.page.main.content.article.doctestBlock.color};
            background: ${this.props.theme.page.main.content.article.doctestBlock.background};
          }
        }
      
        .highlight pre {
          font-size: 1.2rem;
          font-family: Consolas, Arial;
          color: #505050;
          background-color: #ECECEC;
        }
      
        table.highlighttable {
          pre {
            font-size: 1.2rem;
            font-family: Consolas, Arial;
            color: #505050;
            background-color: #ECECEC;
            border: none;
            padding: 0;
            margin-bottom: 0;
          }
        }
      
        table {
          border-collapse: collapse;
          width: 100%;
      
          th {
            background: ${this.props.theme.page.main.content.article.table.header.background};
            color: white;
            padding: 0.7rem;
            font-size: 1.2rem;
          }
      
          tr:nth-of-type(odd) {
            background: #eee;
          }
          td {
            font-size: 1.2rem;
            padding: 0.7rem;
            border: 1px solid #ccc;
          }
        }
      
        img {
          margin-bottom: 1rem;
      
          @media (max-width: 400px) {
            width: 100%;
          }
        }
      
        .note {
          background-color: ${this.props.theme.page.main.content.article.note.background};
          padding: 0.1rem 0.7rem 0.7rem 0.7rem;
          margin-bottom: 1rem;
          border: 1px solid ${this.props.theme.page.main.content.article.note.borderColor};
      
          /*解決 note 的問題*/
          p.first {
            font-size: 1.2rem;
            font-weight: bold;
            color: ${this.props.theme.page.main.content.article.note.titleColor};
            margin-bottom: 0.1rem;
          }
      
          p.last {
            /*line-height: 1rem;*/
            margin-bottom: 0;
          }
        }
      
        .social-block {
          margin-bottom: 20px;
      
          .fb-share-button {
            bottom: 5px;
            margin-right: 5px;
          }
        }
      
        .series-block {
          background: #ECECEC;
          padding: 20px;
          margin-bottom: 20px;
      
          .title {
            font-weight: 700;
            margin-bottom: 30px;
          }
      
          div:not(:first-child) {
            margin-top: 10px;
          }
        }
      }
    `
  }

  render() {
    this.injectGlobalStyle()
    return (
      <Base className='rst-content' dangerouslySetInnerHTML={{__html: this.props.content}}/>
    )
  }
}

export default withTheme(RstContent)
