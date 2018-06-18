import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import * as ResourceComponent from '../components/ResourceComponent'
import { MarkdownRemark, MarkdownRemarkEdge, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import {
  Column,
  Columns,
  Container,
} from 'bloomer'

interface ResourcePageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    resource?: MarkdownRemarkConnection
    allResourceGroupsMarkdown?: {allResourceGroups: string[]},
  },
}

interface ResourcePageLayoutState {
  resourceEdges?: Array<(MarkdownRemarkEdge | null)> | null /** A list of edges. */
}

class ResourcePageLayout extends React.Component<ResourcePageTemplateLayoutProps, ResourcePageLayoutState> {
  constructor(props: ResourcePageTemplateLayoutProps) {
    super(props)
    this.state = { resourceEdges: props.data!.resource!.edges }
  }

  handleFilter = (filter: string) => () => {
    this.setState({
      resourceEdges: this.props.data!.resource!.edges!.filter((edge) =>
        edge!.node!.frontmatter!.resourceGroup === filter),
    })
  }

  clearFilter = () => () => {
    this.setState({
      resourceEdges: this.props.data!.resource!.edges,
    })
  }

  render() {
    return (
      <PageComponent.default {...this.props}>
        <Container>
        Filter these resources by:<br/>
        <a onClick={this.clearFilter()}>All</a>
        {this.props.data!.allResourceGroupsMarkdown!.allResourceGroups!.map((resourceGroup, index) => (
          <React.Fragment key={index}>
            &nbsp;|&nbsp;<a onClick={this.handleFilter(resourceGroup)}>{resourceGroup}</a>
          </React.Fragment>
        ))}
        {_.chunk(this.state.resourceEdges!, this.props.data!.markdownRemark!.frontmatter!.subColumns!)
            .map((chunkedEdges, key) => (
              <Columns key={key}>
                {...chunkedEdges.map((resourceEdge, resourceKey) => (
                  <Column isSize={4} key={resourceKey}>
                    <ResourceComponent.default node={resourceEdge!.node!} />
                  </Column>
                ))}
              </Columns>
            ))}
        </Container>
      </PageComponent.default>
    )
  }
}
export const ResourcesPageTemplateQuery = graphql`
  query ResourcesPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
    allResourceGroupsMarkdown: allMarkdownRemark(filter: {frontmatter: {type: {eq: "resource"}}}, limit: 1000) {
      allResourceGroups: distinct(field: frontmatter___resourceGroup)
    }
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
          resourceGroup,
          resourceType,
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

export default ResourcePageLayout
