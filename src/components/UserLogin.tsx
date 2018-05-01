import * as React from 'react'
import UserAuth from '../utils/userauth'

const auth = new UserAuth()

export default class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
    }
  }

  userlogin() {
    auth.userlogin()

    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  userlogout() {
    auth.userlogout()

    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  componentDidMount() {
    this.setState({
      authenticated: auth.isAuthenticated(),
    })
  }

  render() {
    return (
      <div className="navbar-item">
        {
          !this.state.authenticated && (
              <a className="navbar-item" href="#"
                onClick={this.userlogin.bind(this)}
              >
                LOG IN
                </a>
          )
        }
        {
          this.state.authenticated && (
              <a className="navbar-item" href="#"
                onClick={this.userlogout.bind(this)}
              >
                LOG OUT
                  {
                  auth.getUserName() && (
                    <span> ({auth.getUserName()})</span>
                  )
                }
              </a>
          )
        }
      </div>
    )
  }
}
