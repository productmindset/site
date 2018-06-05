import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import Img from 'gatsby-image'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  CardImage,
  Column,
  Columns,
  Container,
  Section,
  Title
} from 'bloomer'

interface ResourcePageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    resource?: MarkdownRemarkConnection
  },
}

const ContactPageLayout: React.StatelessComponent<ResourcePageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <Container>
        <Section>
          {_.chunk(props.data!.resource!.edges!, props.data!.markdownRemark!.frontmatter!.subColumns!)
            .map((chunkedEdges, key) => (
              <Columns key={key}>
                {...chunkedEdges.map((resourceEdge, resourceKey) => (
                  <Column key={resourceKey}>
                    <Card className="has-text-centered">
                      <CardHeader>
                        <CardHeaderTitle className="is-flex is-horizontally-centered">
                          {resourceEdge!.node!.frontmatter!.resourceType!}
                        </CardHeaderTitle>
                      </CardHeader>
                      <br />
                      <CardImage className="is-16by9">
                        <figure className="is-flex is-horizontally-centered">
                          <Img className="image is-16by9 is-flex is-horizontally-centered"
                            title={resourceEdge!.node!.frontmatter!.fullTitle!}
                            alt={resourceEdge!.node!.frontmatter!.fullTitle!}
                            resolutions={resourceEdge!.node!.imageFile!.childImageSharp!.resolutions!}
                          />
                        </figure>

                      </CardImage>
                      <CardContent className="is-centered">
                        <Title className="is-4 is-centered">{resourceEdge!.node!.frontmatter!.fullTitle!}</Title>
                        <div>
                          {resourceEdge!.node!.frontmatter!.description!}
                        </div>
                        <div>
                          <a href={resourceEdge!.node!.frontmatter!.url!}
                            className="has-text-info has-text-weight-bold">
                            <span className={`fas fa-fw fa-` + resourceEdge!.node!.frontmatter!.buttonFAIcon!}></span>
                            {resourceEdge!.node!.frontmatter!.buttonText!}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </Column>
                ))}
              </Columns>
            ))}
        </Section>
      </Container>
    </PageComponent.default>
  )
}

export const ResourcesPageTemplateQuery = graphql`
  query ResourcesPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
    ...PageQueryFragment
    resource: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "resource"}, active: {eq: true}}},
      sort: {fields: [frontmatter___sortOrder], order: ASC}) {
    edges {
      node {
        imageFile {
          childImageSharp {
          resolutions(width: 256, height: 256 ) {
            ...GatsbyImageSharpResolutions_withWebp
          }
          }
        }
        frontmatter {
          resourceType
          url,
          buttonText,
          buttonFAIcon,
          description
          fullTitle
          image
        }
        }
      }
    }
  }
`

export default ContactPageLayout
