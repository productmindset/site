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
        <h3 className="title">EVENT SPEAKERS</h3>
        {_.chunk(props.data!.speakers!.edges!, 2).map((chunkedEdges, key) => (
          <div className="columns" key={key}>
            {...chunkedEdges.map((speakerEdge, speakerKey) => (
              <div className="column" key={speakerKey}>
                <CardComponent
                  key={speakerKey}
                  description={speakerEdge.node!.frontmatter!.description!}
                  imageSharp = {speakerEdge.node!.imageFile!.childImageSharp!}
                  imageSrc={speakerEdge.node!.frontmatter!.image!}
                  imageAlt={speakerEdge.node!.frontmatter!.fullName!}
                >
                  <p className="title is-4">{speakerEdge.node!.frontmatter!.fullName!}</p>
                  <p className="subtitle is-6">{speakerEdge.node!.frontmatter!.jobTitle!}</p>
                  <p className="subtitle is-6">{speakerEdge.node!.frontmatter!.company!}</p>
                </CardComponent>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="section container" >
        <h3 className="title">WORKSHOP SCHEDULE</h3>
        {props.data!.workshops!.edges!.map((workshopEdge, workshopKey) => (
          <CardComponent
            key={workshopKey}
            description={workshopEdge.node!.frontmatter!.description!}
            imageSharp = {workshopEdge.node!.imageFile!.childImageSharp!}
            imageSrc={workshopEdge.node!.frontmatter!.image!}
            imageAlt={workshopEdge.node!.frontmatter!.fullTitle!}
          >
            <p className="subtitle is-6">
              <i className="far fa-clock fa-fw"></i>
              {workshopEdge.node!.frontmatter!.time!}
            </p>
            <p className="title is-4">{workshopEdge.node!.frontmatter!.fullTitle!}</p>
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
          imageFile {
            childImageSharp {
            resolutions(width: 128, height: 128 ) {
              ...GatsbyImageSharpResolutions_withWebp
            }
            }
          }
          frontmatter {
            fullName
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
          imageFile {
            childImageSharp {
            resolutions(width: 128, height: 128 ) {
              ...GatsbyImageSharpResolutions_withWebp
            }
            }
          }
          frontmatter {
            fullTitle
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
