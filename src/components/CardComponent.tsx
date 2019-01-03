import * as React from 'react'
import { ImageSharp } from '../graphql-types'
import Img from 'gatsby-image'

interface CardComponentProps {
  children?: any
  description: string
  imageAlt: string
  imageSharp?: ImageSharp
}

const CardComponent: React.FunctionComponent<CardComponentProps> = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
            <Img
              title={props.imageAlt}
              alt={props.imageAlt}
              resolutions={props.imageSharp.resolutions}
            />
            </figure>
          </div>
          <div className="media-content">
            {props.children}
          </div>
        </div>
        <div>
          {props.description}
        </div>
      </div>
    </div>
  )
}

export default CardComponent
