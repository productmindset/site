import * as React from 'react'
import * as Page from './page'
import * as PageComponent from '../components/PageComponent'
import { LearnMoreVideo } from '../components/LearnMoreVideo'

const IndexPageLayout: React.StatelessComponent<Page.PageTemplateLayoutProps> = (props) => {
  return (
    <PageComponent.default {...props}>
      <LearnMoreVideo/>
    </PageComponent.default>
  )
}

export const WorkshopsPageTemplateQuery = graphql`
  query IndexPageTemplateQuery($slug: String!, $heroImageSlug: String) {
    ...PageQueryFragment
  }
`

export default IndexPageLayout
