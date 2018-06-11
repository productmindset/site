import * as React from 'react'

import {
  Button,
  Modal,
  ModalBackground,
  ModalClose,
} from 'bloomer'

export class Footer extends React.Component<{}, {} > {

  render() {
    return (
      <div className="has-background-light">
        <div className="has-text-centered">
        <h1 className="is-size-1">
          Find out the latest
        </h1>
        Subscribe now to receive news and updates about next events,
        free resources, exclusive trainings and workshops.
        </div>
          <form name="subscribe" method="POST" data-netlify="true" netlify-honeypot="test-field">
            <input type="hidden" name="subscribe" value="subscribe" />
            <div className="is-hidden">
              <label>Don’t fill this out if you're human
                <input name="test-field"/>
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
    )
  }
}
