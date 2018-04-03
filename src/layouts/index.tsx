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
            integrity: 'sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl',
            src: 'https://use.fontawesome.com/releases/v5.0.9/js/all.js',
          },
        ]}>
        <html lang="en" />
      </Helmet>
      {props.children()}
    </div>
  )
}

export default DefaultLayout
