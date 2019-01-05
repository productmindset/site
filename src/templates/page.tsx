import * as React from 'react'
import { MarkdownRemark, ImageSharp } from '../graphql-types'
import * as PageComponent from '../components/PageComponent'
import { StaticQuery, graphql } from 'gatsby'

export interface PageTemplateLayoutProps {
  headerTitle: string
  pathContext: {
    pagePath: string
  }
  slug: string
  data?: {
    imageSharp?: ImageSharp
    markdownRemark?: MarkdownRemark
  },
  children?: any
}

const PageTemplateLayout: React.FunctionComponent<PageTemplateLayoutProps> = (props) => {
  return (
      <PageComponent.default {...props}/>
  )
}

export default PageTemplateLayout

export const PageQueryFragment = graphql`
  fragment PageQueryFragment on Query {
    imageSharp (fields: {slug: {eq: $heroImageSlug }} ) {
      fluid(maxWidth: 1240 ) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        heroIsVideo
        path
        title
        heroTitle
        heroSubtitle
        templateKey
        includeLearnMore
        subColumns
      }
    }
  }
`

export const PageTemplateQuery = graphql`
  query PageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
  }
`
