import * as React from 'react'
import UserAuth from '../utils/userauth'

class Callback extends React.Component {
  render() {
    const auth = new UserAuth()
    auth.handleAuthentication()
    return (
      <div>Loading...</div>
    )
  }
}

export default Callback
