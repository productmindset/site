/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const webpack = require(`webpack`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case `build-html`:
      config.plugin(`define`, webpack.DefinePlugin, [ { "global.GENTLY": false } ])
      break
  }

  return config
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  return graphql(`
      {
       allMarkdownRemark(filter: { frontmatter: { isPage: {eq: true} } }, limit: 1000) {
         edges {
           node {
             fields {
               slug
             }
             frontmatter {
               path
               title
               templateKey
               heroImage
             }
           }
         }
       }
     }
   `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const pagePath = `/` + (node.frontmatter.path || node.frontmatter.title.split(` `, 1)[0].toLowerCase())
      createPage({
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.tsx`
        ),
        // additional data can be passed via context
        context: { slug: node.fields.slug, heroImageSlug: node.frontmatter.heroImage, pagePath: pagePath },
        path: pagePath
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    if (node.frontmatter.isPage === true) {
      const slug = createFilePath({ node, getNode, basePath: `content/pages` })
      createNodeField({
        node,
        name: `slug`,
        value: slug
      })
    } else if (node.frontmatter.type === `workshop` ||
      node.frontmatter.type === `speaker` || node.frontmatter.type === `benefit` || node.frontmatter.type === `resource`) {
      const pathToFile = path
        .join(__dirname, `static`, node.frontmatter.image)
        .split(path.sep)
        .join(`/`)

      // Find ID of File node
      const fileNode = getNodes().find(n => n.absolutePath === pathToFile)
      node.imageFile___NODE = fileNode.id
    }
  } else if (node.internal.type === `ImageSharp`) {
    console.log(`Node`)
    console.log(node)
    const slug = `/images` + createFilePath({ node, getNode, basePath: `static` })
    console.log(`slug`)
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}
