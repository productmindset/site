import * as React from 'react'
import * as _ from 'lodash'
import * as Page from './page'
import * as PageComponent from '../components/PageComponent'
import CardComponent from '../components/CardComponent'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

interface WorkshopPageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    speakers?: MarkdownRemarkConnection
    workshops?: MarkdownRemarkConnection
  },
}

const WorkshopsPageLayout: React.FunctionComponent<WorkshopPageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <Helmet
        title="3Pillar Global Product Mindset Workshop - Workshops"
        meta={[
          { name: 'description', content: 'Product Mindset Workshops - Workshops' },
        ]}>
      </Helmet>
      <div className="section container" >
        <h3 className="title">EVENT SPEAKERS</h3>
        {_.chunk(props.data.speakers.edges, 2).map((chunkedEdges, key) => (
          <div className="columns" key={key}>
            {chunkedEdges.map((speakerEdge, speakerKey) => (
              <div className="column" key={speakerKey}>
                <CardComponent
                  key={speakerKey}
                  description={speakerEdge.node.frontmatter.description}
                  imageSharp = {speakerEdge.node.imageFile.childImageSharp}
                  imageAlt={speakerEdge.node.frontmatter.fullName}
                >
                  <p className="title is-4 is-size-6-mobile">{speakerEdge.node.frontmatter.fullName}</p>
                  <p className="subtitle is-6 is-size-7-mobile">{speakerEdge.node.frontmatter.jobTitle}</p>
                  <p className="subtitle is-6 is-size-7-mobile">{speakerEdge.node.frontmatter.company}</p>
                </CardComponent>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="section container" >
        <h3 className="title">WORKSHOP SCHEDULE</h3>
        {props.data.workshops.edges.map((workshopEdge, workshopKey) => (
          <CardComponent
            key={workshopKey}
            description={workshopEdge.node.frontmatter.description}
            imageSharp = {workshopEdge.node.imageFile.childImageSharp}
            imageAlt={workshopEdge.node.frontmatter.fullTitle}
          >
            <p className="subtitle is-6">
              <i className="far fa-clock fa-fw"></i>
              {workshopEdge.node.frontmatter.time}
            </p>
            <p className="title is-4 is-size-6-mobile">{workshopEdge.node.frontmatter.fullTitle}</p>
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
            fixed(width: 128, height: 128 ) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
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
            fixed(width: 128, height: 128 ) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
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
