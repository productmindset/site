import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import * as ResourceComponent from '../components/ResourceComponent'
import { MarkdownRemark, MarkdownRemarkEdge, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
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
  filter?: string
  resourceEdges?: Array<(MarkdownRemarkEdge | null)> | null /** A list of edges. */
}

class ResourcePageLayout extends React.Component<ResourcePageTemplateLayoutProps, ResourcePageLayoutState> {
  constructor(props: ResourcePageTemplateLayoutProps) {
    super(props)
    this.state = { resourceEdges: props.data!.resource!.edges }
  }

  handleFilter = (filter: string) => () => {
    this.setState({
      filter,
      resourceEdges: this.props.data!.resource!.edges!.filter((edge) =>
        edge!.node!.frontmatter!.resourceGroup === filter),
    })
  }

  clearFilter = () => () => {
    this.setState({
      filter: undefined,
      resourceEdges: this.props.data!.resource!.edges,
    })
  }

  render() {
    return (
      <PageComponent.default {...this.props}>
        <Helmet
          title="3Pillar Global Product Mindset Workshop - Resources"
          meta={[
            { name: 'description', content: 'Product Mindset Workshops - Resources' }
          ]}>
        </Helmet>
        <Container>
          <p className="has-text-weight-bold has-text-primary">
            Filter these resources by:<br/>
          </p>
        <a onClick={this.clearFilter()} className={this.state.filter ? '' : 'has-text-info'}>All</a>
        {this.props.data!.allResourceGroupsMarkdown!.allResourceGroups.map((resourceGroup, index) => (
          <React.Fragment key={index}>
            &nbsp;|&nbsp;<a className={this.state.filter === resourceGroup ? 'has-text-info' : ''}
              onClick={this.handleFilter(resourceGroup)}>{resourceGroup}</a>
          </React.Fragment>
        ))}
        {_.chunk(this.state.resourceEdges!, 3)
            .map((chunkedEdges, key) => (
              <Columns key={key}>
                {chunkedEdges.map((resourceEdge, resourceKey) => (
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
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
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
