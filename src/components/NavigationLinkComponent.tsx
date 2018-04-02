import * as React from 'react'
import Link from 'gatsby-link'

interface NavigationLinkComponentProps {
  isActive: boolean
  title: string,
  to: string
}

const NavigationLinkComponent: React.StatelessComponent<NavigationLinkComponentProps> = (props) => {
  return (
    <Link className={'navbar-item' + (props.isActive ? ' is-active' : '')}
      to={props.to}
    >
      {props.title}
    </Link>
  )
}

export default NavigationLinkComponent
