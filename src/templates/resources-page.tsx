import * as React from 'react'
import * as Page from './page'
const releasePlanImage = require('../../content/images/included/release_plan.png')
const personaCreationImage = require('../../content/images/included/persona_creation.png')

const ContactPageLayout: React.StatelessComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <Page.default {...props}>
        <div className="columns" >
          <div className="column" >
            <div className="card">
              <div className="card-image">
                <figure className="image is-4x3">
                  <img src={releasePlanImage} alt="Rlease Plan image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Release Plan</p>
                  </div>
                </div>

                <div className="content">
                  Plan how you can get things in your customer's hands quickly.
                  Releae planning helps the team understand how we get new stories or features to market.
              </div>
              </div>
            </div>
          </div>
          <div className="column" >
            <div className="card">
              <div className="card-image">
                <figure className="image is-4x3">
                  <img src={personaCreationImage} alt="Persona Creation image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Persona Creation</p>
                  </div>
                </div>

                <div className="content">
                  Personas give us a way to think about who exists beyond the screen and what their life looks like,
                  what motivates them, frustrates them and what they are trying to do with our product. This helps us
                  make informed decisions about how to better serve them and drive adoption, referrals and retention.
              </div>
              </div>
            </div>
          </div>
        </div>
      </Page.default>
    </div >
  )
}

export const ResourcesPageTemplateQuery = graphql`
  query ResourcesPageTemplateQuery($slug: String!, $heroImageSlug: String) {
            imageSharp(fields: {slug: {eq: $heroImageSlug }} ) {
            sizes(maxWidth: 1240 ) {
            ...GatsbyImageSharpSizes
          }
          }
    markdownRemark(fields: {slug: {eq: $slug } }) {
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

export default ContactPageLayout
