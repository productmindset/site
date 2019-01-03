import * as React from 'react'
import * as Page from './page'
import * as PageComponent from '../components/PageComponent'

const ContactPageLayout: React.FunctionComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <div>
      <PageComponent.default {...props}>
        <div className="container section" >
          <form name="contact" method="POST" data-netlify="true" netlify-honeypot="test-field">
            <input type="hidden" name="contact" value="contact" />
            <div className="is-hidden">
              <label>Don’t fill this out if you're human
                <input name="test-field"/>
              </label>
            </div>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" placeholder="Name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input is-danger" type="email" name="email" placeholder="Email" />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <div className="select">
                  <select name="subject">
                    <option value="feedback">Feedback</option>
                    <option value="contact">Contact Me</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" name="message" placeholder="Textarea"></textarea>
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
      </PageComponent.default>
    </div >
  )
}

export const AboutPageTemplateQuery = graphql`
  query AboutPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
  }
`

export default ContactPageLayout
