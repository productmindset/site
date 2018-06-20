import * as React from 'react'
import Helmet from 'react-helmet'

import '../../content/styles/site.scss'

require('typeface-roboto')
require('typeface-roboto-condensed')
interface DefaultLayoutProps {
  children(): React.ReactNode,
}

const DefaultLayout: React.StatelessComponent<DefaultLayoutProps> = (props) => {
  return (
    <div>
      <Helmet
        title="3Pillar Global Product Mindset Workshop"
        meta={[
          { name: 'description', content: 'Join the Product Mindset Workshops' },
          { name: 'keywords', content: 'product, mindset, agile, software, development' },
        ]}
        script={[
          {
            crossorigin: 'anonymous',
            defer: true,
            integrity: 'sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe',
            src: 'https://use.fontawesome.com/releases/v5.0.13/js/all.js',
          },
        ]}>
        <html lang="en" />
      </Helmet>
      {props.children()}
    </div>
  )
}

export default DefaultLayout
