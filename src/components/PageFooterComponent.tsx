import * as React from 'react'
import Link from 'gatsby-link'

import {
  Container,
  Footer,
  Section
} from 'bloomer'

export class PageFooter extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <Section className="has-background-light">
          <Container>
            <div className="has-background-light">
              <div className="has-text-centered">
                <p className="is-size-1">
                  Find out the latest
              </p>
                <p>
                  Subscribe now to receive news and updates about next events,
                  free resources, exclusive trainings and workshops.
              </p>
              </div>
              <form name="subscribe" method="POST" data-netlify="true" netlify-honeypot="test-field">
                <input type="hidden" name="subscribe" value="subscribe" />
                <div className="is-hidden">
                  <label>Don’t fill this out if you're human
                <input name="test-field" />
                  </label>
                </div>

                <div className="field is-grouped">
                  <div className="control has-icons-left has-icons-right is-expanded">
                    <input className="input" type="email" name="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-primary">Subscribe</button>
                  </div>
                </div>

              </form>
            </div>
          </Container>
        </Section>
        <Footer className="has-text-white">
          <p>
            <Link className="has-text-white"
              to={'/'}
            >
              HOME
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="has-text-white"
              to={'workshops'}
            >
              LIVE WORKSHOPS
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="has-text-white"
              to={'resources'}
            >
              ONLINE RESOURCES
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="has-text-white"
              to={'faq'}
            >
              SUPPORT
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link className="has-text-white"
              to={'contact'}
            >
              CONTACT
            </Link>
          </p>
          <p className="is-size-7">
            Copyright &copy; Product Mindset, Powered by &nbsp;
                <a className="has-text-white" href="https://www.3pillarglobal.com">
              <u>3Pillar Global</u>
            </a>
          </p>
        </Footer>
      </div>
    )
  }
}
