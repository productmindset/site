import * as React from 'react'

interface CardComponentProps {
  children?: any
  description: string
  imageSrc: string
  imageAlt: string
}

const CardComponent: React.StatelessComponent<CardComponentProps> = (props) => {
  return (
    <div className="card">
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-128x128">
            <img src={props.imageSrc} alt={props.imageAlt} />
          </figure>
        </div>
        <div className="media-content">
          {props.children}
        </div>
      </div>
      <div className="content">
        {props.description}
      </div>
    </div>
  </div>
  )
}

export default CardComponent
