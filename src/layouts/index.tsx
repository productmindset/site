import * as React from 'react'
import Helmet from 'react-helmet'

import '../../content/styles/site.scss'

require('@fortawesome/fontawesome-free-webfonts/css/fontawesome.css')
require('@fortawesome/fontawesome-free-webfonts/css/fa-solid.css')
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
      >
        <html lang="en" />
      </Helmet>
      {props.children()}
    </div>
  )
}

export default DefaultLayout
