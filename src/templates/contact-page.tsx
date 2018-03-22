import * as React from 'react'
import * as Page from './page'

const ContactPageLayout: React.StatelessComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <Page.default {...props}>
        <div className="container" >
          <form name="contact" method="POST" data-netlify="true">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input is-danger" type="email" placeholder="Email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <div className="select">
                  <select>
                    <option>Feedback</option>
                    <option>Contact Me</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-primary">Submit</button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </Page.default>
    </div >
  )
}

export const AboutPageTemplateQuery = graphql`
  query AboutPageTemplateQuery($slug: String!, $heroImageSlug: String) {
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
