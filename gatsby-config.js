module.exports = {
  siteMetadata: {
    title: `3Pillar Global Product Mindset Workshop`,
    siteName: `Product Mindset`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
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
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: `w7UUvSNSMjO6PEWIwMSDDUdWaEAKIWok`,

        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        devKey: `pYHBLk0Cnzt02FS3keymuYeqSx22iGRR`,

        // whether you want to include analytics.page()
        // optional; boolean that defaults to true
        // if false, then don't forget to manually add it to your codebase manually!
        trackPage: true
      }
    }
  ]
}
