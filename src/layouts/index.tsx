import * as React from 'react'
import Helmet from 'react-helmet'

import '../../content/styles/site.sass'

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
        link={[
          {
            href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400',
            rel: 'stylesheet',
            type: 'text/css',
          },
        ]}
        script={[
          {
            defer: true,
            src: 'https://use.fontawesome.com/releases/v5.0.6/js/all.js',
          },
        ]}
      />
      {props.children()}
    </div>
  )
}

export default DefaultLayout
