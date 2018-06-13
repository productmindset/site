import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import * as ResourceComponent from '../components/ResourceComponent'
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
        {_.chunk(props.data!.resource!.edges!, props.data!.markdownRemark!.frontmatter!.subColumns!)
          .map((chunkedEdges, key) => (
            <Columns key={key}>
              {...chunkedEdges.map((resourceEdge, resourceKey) => (
                <Column key={resourceKey}>
                  <ResourceComponent.default node={resourceEdge!.node!} />
                </Column>
              ))}
            </Columns>
          ))}
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
        html,
        imageFile {
          childImageSharp {
            sizes(maxWidth: 700) {
              ...GatsbyImageSharpSizes_withWebp
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
