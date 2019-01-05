import * as React from 'react'
import Img from 'gatsby-image'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  CardImage,
  Content,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFooter,
  ModalCardHeader,
  ModalCardTitle,
  Title
} from 'bloomer'

interface ResourceComponentProps {
  children?: any
  node?: MarkdownRemark
}

interface ResourceComponentState {
  isModalOpen: boolean
}

export default class ResourceComponent extends React.Component<ResourceComponentProps, ResourceComponentState> {
  constructor(props: ResourceComponentProps) {
    super(props)
    this.state = { isModalOpen: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    return (
      <Card className="has-text-centered">
        <CardHeader>
          <CardHeaderTitle className="is-flex is-horizontally-centered">
            {this.props.node!.frontmatter!.resourceType!}
          </CardHeaderTitle>
        </CardHeader>
        <CardImage>
          <figure>
            <Img
              title={this.props.node!.frontmatter!.fullTitle!}
              alt={this.props.node!.frontmatter!.fullTitle!}
              fluid={this.props.node!.imageFile!.childImageSharp!.fluid!}
            />
          </figure>

        </CardImage>
        <CardContent className="is-centered">
          <Title className="is-4 is-centered">{this.props.node!.frontmatter!.fullTitle!}</Title>
          <div>
            {this.props.node!.frontmatter!.description!}
          </div>
            {this.props.node!.html!.length === 0 &&
              <a href={this.props.node!.frontmatter!.url!}
                className="has-text-info has-text-weight-bold">
                <span className={`fas fa-fw ` +
                  this.props.node!.frontmatter!.buttonFAIcon!.replace(` `, ` fa-`)}></span>
                {this.props.node!.frontmatter!.buttonText!}
              </a>
            }
            {this.props.node!.html!.length > 0 &&
              <div>
                <a onClick={this.handleClick}
                  className="has-text-info has-text-weight-bold">
                  <span className="fas fa-fw fa-arrow-circle-right"></span>
                  More
                </a>
                <Modal className={'has-text-left has-text-weight-normal ' +
                    (this.state.isModalOpen ? 'is-active' : '')}>
                  <ModalBackground></ModalBackground>
                  <ModalCard>
                    <ModalCardHeader>
                      <ModalCardTitle>{this.props.node!.frontmatter!.fullTitle!}</ModalCardTitle>
                      <button className="delete" aria-label="close" onClick={this.handleClick}></button>
                    </ModalCardHeader>
                    <ModalCardBody>
                      <Content
                        dangerouslySetInnerHTML={{ __html: this.props.node!.html! }} />
                    </ModalCardBody>
                    <ModalCardFooter>
                      <a href={this.props.node!.frontmatter!.url!} className="button is-info">
                        <span className={`fas fa-fw ` +
                          this.props.node!.frontmatter!.buttonFAIcon!.replace(` `, ` fa-`)}></span>
                        {this.props.node!.frontmatter!.buttonText!}
                      </a>
                      <button className="button" onClick={this.handleClick}>Close</button>
                    </ModalCardFooter>
                  </ModalCard>
                </Modal>
              </div>
            }
        </CardContent>
      </Card>
    )
  }
}
