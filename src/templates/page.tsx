import * as React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { MarkdownRemark, ImageSharp } from '../graphql-types'

const logo = require('../../content/images/included/logo.png')
const landingVideo = require('../../content/media/landing_video.mp4')

const heroHeight = '480px'

const heroHeightStyle = {
  height: heroHeight,
}

const heroVideoStyle = {
  height: heroHeight,
  objectFit: 'cover',
  objectPosition: 'center top',
}

export interface PageTemplateLayoutProps {
  headerTitle: string
  pathContext: {
    pagePath: string
  }
  slug: string
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
  },
  children?: any
}

const PageTemplateLayout: React.StatelessComponent<PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <div className="hero is-primary is-medium" style={heroHeightStyle}>
        <div className="hero-video is-transparent" style={heroHeightStyle}>
          {props.data!.markdownRemark!.frontmatter!.heroIsVideo && (
            <video className="is-transparent" playsInline autoPlay muted loop style={heroVideoStyle}>
              <source src={landingVideo} type="video/mp4" />
            </video>
          )}
          {props.data!.imageSharp && (
            <Img style={heroVideoStyle} className="heroVideoStyle"
              title="Header image"
              alt="Greek food laid out on table"
              sizes={props.data!.imageSharp!.sizes!}
            />
          )}
        </div>
        <nav className="navbar is-overlay is-transparent">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item"
                to="/"
              >
                <img src={logo} alt="Logo" />
              </Link>
              <span id="nav-toggle" className="navbar-burger burger" data-target="nav-menu"
                onClick={() => {
                  const toggle = document.querySelector('#nav-toggle')
                  const menu = document.querySelector('#nav-menu')
                  toggle!.classList.toggle('is-active')
                  menu!.classList.toggle('is-active')
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="nav-menu" className="navbar-menu">
              <div className="navbar-end">
                <Link className={'navbar-item' + (props.pathContext.pagePath === '/workshops' ? ' is-active' : '')}
                  to="/workshops"
                >
                  LIVE WORKSHOPS
              </Link>
                <Link className={'navbar-item' + (props.pathContext.pagePath === '/resources' ? ' is-active' : '')}
                  to="/resources"
                >
                  ONLINE RESOURCES
              </Link>
                <Link className={'navbar-item' + (props.pathContext.pagePath === '/faq' ? ' is-active' : '')}
                  to="/faq"
                >
                  SUPPORT
              </Link>
                <Link className={'navbar-item' + (props.pathContext.pagePath === '/contact' ? ' is-active' : '')}
                  to="/contact"
                >
                  CONTACT
              </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="hero-body">
          <p className="title">
            {props.data!.markdownRemark!.frontmatter!.heroTitle!}
          </p>
          <p className="subtitle">
            {props.data!.markdownRemark!.frontmatter!.heroSubtitle!}
          </p>
        </div>
      </div>
      <div className="container content" dangerouslySetInnerHTML={{ __html: props.data!.markdownRemark!.html! }} />
      {props.children}
    </div >
  )
}

export default PageTemplateLayout

export const PageTemplateQuery = graphql`
  query PageTemplateQuery($slug: String!, $heroImageSlug: String) {
    imageSharp (fields: {slug: {eq: $heroImageSlug }} ) {
      sizes(maxWidth: 1240 ) {
        ...GatsbyImageSharpSizes
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        heroIsVideo
        path
        title
        heroTitle
        heroSubtitle
        templateKey
      }
    }
  }
`
