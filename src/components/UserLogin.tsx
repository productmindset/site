import * as React from 'react'
import { Control, Button, NavbarItem } from 'bloomer'
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
      <NavbarItem>
        <Control>
        <Button isColor="info">
          {
            !this.state.authenticated && (
              <a href="#"
                onClick={this.userlogin.bind(this)}
              >
                JOIN US
                </a>
            )
          }
          {
            this.state.authenticated && (
              <a href="#"
                onClick={this.userlogout.bind(this)}
              >
                LOG OUT
              </a>
            )
          }
        </Button>
        </Control>
      </NavbarItem>
    )
  }
}
