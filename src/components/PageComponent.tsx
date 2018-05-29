import * as React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { MarkdownRemark, ImageSharp } from '../graphql-types'
import * as Page from '../templates/page'
import NavigationLinkComponent from './NavigationLinkComponent'
import UserLogin from './UserLogin'
import { LearnMoreVideo } from './LearnMoreVideo'
import { Columns, Column, Container, Section } from 'bloomer'

const logo = require('../../content/images/included/logo.png')
const landingVideo = require('../../content/media/landing_video.mp4')

const heroVideoStyle = {
  borderRadius: '50%',
  height: '480px',
  objectFit: 'cover',
  objectPosition: 'center top',
  width: '480px',
}

const navIndex = {
  zIndex: 1,
}

const navigationMenuLinks = [
  {
    title: `LIVE WORKSHOPS`,
    to: `/workshops`,
  },
  {
    title: `ONLINE RESOURCES`,
    to: `/resources`,
  },
  {
    title: `SUPPORT`,
    to: `/faq`,
  },
  {
    title: `CONTACT`,
    to: `/contact`,
  },
]

const PageComponent: React.StatelessComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <nav className="navbar is-overlay is-transparent" style={navIndex}>
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
              {navigationMenuLinks.map((navigationLink, key) => (
                <NavigationLinkComponent
                  key={key}
                  title={navigationLink.title}
                  to={navigationLink.to}
                  isActive={props.pathContext.pagePath === navigationLink.to}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Section>
        <Container>
        <Columns isCentered isVCentered>
          <Column>
            <p className="title">
              {props.data!.markdownRemark!.frontmatter!.heroTitle!}
            </p>
            <p className="subtitle">
            {props.data!.markdownRemark!.frontmatter!.heroSubtitle!}
            </p>
            {props.data!.markdownRemark!.frontmatter!.includeLearnMore && (
              <LearnMoreVideo />
            )}
          </Column>
          <Column isHidden="mobile">
            <div style={heroVideoStyle}>
            {props.data!.markdownRemark!.frontmatter!.heroIsVideo && (
              <video style={heroVideoStyle} className="is-transparent" playsInline autoPlay muted loop>
                <source src={landingVideo} type="video/mp4" />
              </video>
            )}
            {props.data!.imageSharp && (
              <Img style={heroVideoStyle}
                title="Header image"
                alt="Header image"
                sizes={props.data!.imageSharp!.sizes!}
              />
            )}
            </div>
          </Column>
        </Columns>
        </Container>
      </Section>
      <div className="container section content"
        dangerouslySetInnerHTML={{ __html: props.data!.markdownRemark!.html! }} />
      {props.children}
    </div >
  )
}

export default PageComponent
