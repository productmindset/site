import * as React from 'react'
import * as _ from 'lodash'
import * as Page from './page'
import * as PageComponent from '../components/PageComponent'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'

interface WorkshopPageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    speakers?: MarkdownRemarkConnection
  },
}

const WorkshopsPageLayout: React.StatelessComponent<WorkshopPageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <div className="section container" >
        <h3 className="title">Speakers</h3>
        {_.chunk(props.data!.speakers!.edges!, 2).map((chunkedEdges) => (
          <div className="columns">
            {...chunkedEdges.map((edge) => (
              <div className="column">
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-128x128">
                          <img src={edge.node!.frontmatter!.image!} alt={edge.node!.frontmatter!.fulllName!} />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">{edge.node!.frontmatter!.fulllName!}</p>
                        <p className="subtitle is-6">{edge.node!.frontmatter!.jobTitle!}</p>
                        <p className="subtitle is-6">{edge.node!.frontmatter!.company!}</p>
                      </div>
                    </div>
                    <div className="content">
                      {edge.node!.frontmatter!.description!}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageComponent.default>
  )
}

export const WorkshopsPageTemplateQuery = graphql`
  query WorkshopsPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
    speakers: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "speaker"}}},
      sort: {fields: [frontmatter___sortOrder], order: ASC}) {
    edges {
      node {
        frontmatter {
          fulllName
          jobTitle
          company
          description
          image
        }
      }
    }
  }
}
`

export default WorkshopsPageLayout
