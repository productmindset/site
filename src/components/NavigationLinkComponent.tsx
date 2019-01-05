import * as React from 'react'
import { Link } from "gatsby"

interface NavigationLinkComponentProps {
  isActive: boolean
  title: string,
  to: string
}

const NavigationLinkComponent: React.FunctionComponent<NavigationLinkComponentProps> = (props) => {
  return (
    <Link className={'navbar-item' + (props.isActive ? ' is-active' : '')}
      to={props.to}
    >
      {props.title}
    </Link>
  )
}

export default NavigationLinkComponent
