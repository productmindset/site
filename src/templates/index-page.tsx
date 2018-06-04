import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import Img from 'gatsby-image'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'

interface HomePageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    benefit?: MarkdownRemarkConnection
  },
}

const IndexPageLayout: React.StatelessComponent<HomePageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <div className="section container" >
        {_.chunk(props.data!.benefit!.edges!, 2).map((chunkedEdges, key) => (
          <div className="columns" key={key}>
            {...chunkedEdges.map((benefitEdge, benefitKey) => (
              <div className="column" key={benefitKey}>
                <div className="card has-text-centered">
                  <br/>
                  <div className="card-image is-64x64">
                    <figure className="is-flex is-horizontally-centered">
                      <Img className="image is-64x64 is-flex is-horizontally-centered"
                        title={benefitEdge!.node!.frontmatter!.fullTitle!}
                        alt={benefitEdge!.node!.frontmatter!.fullTitle!}
                        resolutions={benefitEdge!.node!.imageFile!.childImageSharp!.resolutions!}
                      />
                    </figure>

                  </div>
                  <div className="card-content is-centered">
                  <div className="title is-4 is-centered">{benefitEdge!.node!.frontmatter!.fullTitle!}</div>
                    <div>
                      {benefitEdge!.node!.frontmatter!.description!}
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
  query IndexPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
    benefit: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "benefit"}, active: {eq: true}}},
      sort: {fields: [frontmatter___sortOrder], order: ASC}) {
    edges {
      node {
        imageFile {
          childImageSharp {
          resolutions(width: 64, height: 64 ) {
            ...GatsbyImageSharpResolutions_withWebp
          }
          }
        }
        frontmatter {
          description
          fullTitle
          image
        }
        }
      }
    }
  }
`

export default IndexPageLayout
