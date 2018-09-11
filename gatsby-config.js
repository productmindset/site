module.exports = {
  siteMetadata: {
    title: `3Pillar Global Product Mindset Workshop`,
    siteName: `Product Mindset`,
    siteUrl: `https://www.productmindset.com`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        omitGoogleFont: true,
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`
      }
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-plugin-sentry`,
      options: {
        dsn: `https://61f7cd75771243b585e25962eef08863@sentry.io/1202850`,
        // Raven.js version
        version: `3.19.1`
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `./static/images/included/favicon.png`,
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ]
}
