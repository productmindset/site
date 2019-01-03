import * as React from 'react'
import * as Page from './page'
import * as _ from 'lodash'
import * as PageComponent from '../components/PageComponent'
import Img from 'gatsby-image'
import { MarkdownRemark, MarkdownRemarkConnection, ImageSharp } from '../graphql-types'
import {
  Card,
  CardContent,
  CardImage,
  Column,
  Columns,
  Container,
  Section,
  Title
} from 'bloomer'

interface HomePageTemplateLayoutProps extends Page.PageTemplateLayoutProps {
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
    benefit?: MarkdownRemarkConnection
  },
}

const IndexPageLayout: React.SFC<HomePageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <Container>
        <Section>
          {_.chunk(props.data!.benefit!.edges!, props.data!.markdownRemark!.frontmatter!.subColumns!)
            .map((chunkedEdges, key) => (
            <Columns key={key}>
              {...chunkedEdges.map((benefitEdge, benefitKey) => (
                <Column key={benefitKey}>
                  <Card className="has-text-centered">
                    <br />
                    <CardImage className="is-64x64">
                      <figure className="is-flex is-horizontally-centered">
                        <Img className="image is-64x64 is-flex is-horizontally-centered"
                          title={benefitEdge!.node!.frontmatter!.fullTitle!}
                          alt={benefitEdge!.node!.frontmatter!.fullTitle!}
                          resolutions={benefitEdge!.node!.imageFile!.childImageSharp!.resolutions!}
                        />
                      </figure>

                    </CardImage>
                    <CardContent className="is-centered">
                      <Title className="is-4 is-centered">{benefitEdge!.node!.frontmatter!.fullTitle!}</Title>
                      <div>
                        {benefitEdge!.node!.frontmatter!.description!}
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
