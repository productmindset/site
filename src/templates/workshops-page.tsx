import * as React from 'react'
import * as _ from 'lodash'
import * as Page from './page'
import * as PageComponent from '../components/PageComponent'
import CardComponent from '../components/CardComponent'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'

interface WorkshopPageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    speakers?: MarkdownRemarkConnection
    workshops?: MarkdownRemarkConnection
  },
}

const WorkshopsPageLayout: React.StatelessComponent<WorkshopPageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <div className="section container" >
        <h3 className="title">Speakers</h3>
        {_.chunk(props.data!.speakers!.edges!, 2).map((chunkedEdges) => (
          <div className="columns">
            {...chunkedEdges.map((speakerEdge) => (
              <div className="column">
                <CardComponent
                  description={speakerEdge.node!.frontmatter!.description!}
                  imageSrc={speakerEdge.node!.frontmatter!.image!}
                  imageAlt={speakerEdge.node!.frontmatter!.fulllName!}
                >
                  <p className="title is-4">{speakerEdge.node!.frontmatter!.fulllName!}</p>
                  <p className="subtitle is-6">{speakerEdge.node!.frontmatter!.jobTitle!}</p>
                  <p className="subtitle is-6">{speakerEdge.node!.frontmatter!.company!}</p>
                </CardComponent>
              </div>
            ))}
          </div>
        ))}
        <h3 className="title">Workshops</h3>
        {props.data!.workshops!.edges!.map((workshopEdge) => (
          <CardComponent
            description={workshopEdge.node!.frontmatter!.description!}
            imageSrc={workshopEdge.node!.frontmatter!.image!}
            imageAlt={workshopEdge.node!.frontmatter!.fulllTitle!}
          >
            <p className="subtitle is-6">
              <i className="far fa-clock fa-fw"></i>
              {workshopEdge.node!.frontmatter!.time!}
            </p>
            <p className="title is-4">{workshopEdge.node!.frontmatter!.fulllTitle!}</p>
          </CardComponent>
        ))}
      </div>
    </PageComponent.default>
  )
}

export const WorkshopsPageTemplateQuery = graphql`
  query WorkshopsPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
    speakers: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "speaker"}, active: {eq: true}}},
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
    workshops: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "workshop"}, active: {eq: true}}},
        sort: {fields: [frontmatter___sortOrder], order: ASC}) {
      edges {
        node {
          frontmatter {
            fulllTitle
            time
            description
            image
          }
        }
      }
    }
  }
`

export default WorkshopsPageLayout
