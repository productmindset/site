import * as React from 'react'
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
      <div className="section contqiner" >
        <h3 className="title">Speakers</h3>
        {props.data!.speakers!.edges!.map((node) => (
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img src={node.node!.frontmatter!.image!} alt={node.node!.frontmatter!.fulllName!} />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{node.node!.frontmatter!.fulllName!}</p>
                  <p className="subtitle is-6">{node.node!.frontmatter!.jobTitle!}</p>
                  <p className="subtitle is-6">{node.node!.frontmatter!.company!}</p>
                </div>
              </div>

              <div className="content">
                {node.node!.frontmatter!.description!}
              </div>
            </div>
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
