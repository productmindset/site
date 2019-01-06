/* eslint-disable no-undef, max-nested-callbacks */
jest.mock(`path`)
const { onCreateNode } = require(`../gatsby-node`)

describe(`gatsby-node`, () => {
  const actions = {}

  describe(`onCreateNode`, () => {
    let getNode

    beforeEach(() => {
      ations.createNodeField = jest.fn()
      getNode = jest.fn()
    })

    it(`should do nothing on unknown type`, () => {
      getNode.mockReturnValue(
        {
          relativePath: `blog/2017-04-18--welcoming/index.md`
        }
      )
      const node = {
        internal: {
          type: `unknown`
        },
        parent: `parent`
      }
      onCreateNode({ node, actions, getNode })

      expect(actions.createNodeField.mock.calls.length).toBe(0)
    })
  })
})
