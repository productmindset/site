# Product Mindset Site

Web site for: <https://www.productmindset.com>

Currently deployed to:

* site / primary domain - <https://www.productmindset.com/>
* redirects to primary domain - <https://productmindset.com/>
* default build subdomain - <https://product-mindset.netlify.com/>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

npm (or yarn) - <https://www.npmjs.com/> or <https://yarnpkg.com/en/>

Note: `npm` and `yarn` commands can generally be run interchangeable. For example:

```sh
npm install
```

or

```sh
yarn install
```

`yarn` commands will be used in this readme for brevity

### Installing

```sh
yarn install
```

Having the Gatsby CLI program installed can also be helpful:

```sh
yarn global add gatsby-cli
```

### Development

The following will run a local development instance:

```sh
yarn develop
```

The following will run a local production instance:

```sh
yarn build
gatsby serve
```

#### Concepts

This project uses the [Gatsby]<https://www.gatsbyjs.org/> [React.js]<https://reactjs.org/> Static Site Generator (SSG).

* [Gatsby Docs]<https://www.gatsbyjs.org/docs/>
* [Gatsby Project Structure]<https://www.gatsbyjs.org/docs/gatsby-project-structure/>

#### Automated Build

The following commands are run durng the automated build and are required to be completed successfully.

```sh
yarn lint
yarn build
yarn test
```

They can be run locally to resolve any build issues.

Preview deploys are available from `Netlify` on each branch / pull request. CMS Admin functionality is available on these previews, however the backend will still point to the master branch and not the branch from the pull request.

There are several additional automation checks run on branches. Some may be helpful.

#### CMS Development

This project uses the [Netlify CMS]<https://www.netlifycms.org/>.

Netlify CMS options are configured in `/static/admin/config.yml`.

Note the following section:

```yaml
backend:
  name: git-gateway
  branch: master
  repo: product-mindset/site

publish_mode: editorial_workflow
```

The following will allow for using a local in-memory version of the CMS backend (useful for local development)

```yaml
backend:
  name: test-repo
```

And remove:

~~branch: master~~

~~repo: product-mindset/site~~

~~publish_mode: editorial_workflow~~

Note that the test-repo backend does not (currently) support using the `editorial_workflow`.

Modifying these settings *locally* should allow for a useful CMS development environment.

### Deployment

Merges to `master` will automatically be deployed to the [Netlify]<https://www.netlify.com/> hosting service. [Netlify Identity]<https://www.netlify.com/docs/identity/> and [Netlify Forms]<https://www.netlify.com/docs/form-handling/> are used.

## Deploying a new instance

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/product-mindset/site)

## Forked From

### gatsby-starter-typescript

The [default Gatsby starter](https://github.com/gatsbyjs/gatsby-starter-default) converted to [TypeScript](https://www.typescriptlang.org/).

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/)

Install the original starter (assuming Gatsby is installed) by running from your CLI:

```sh
gatsby new gatsby-starter-typescript https://github.com/haysclark/gatsby-starter-typescript
```

### Deploying the original starter

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/haysclark/gatsby-starter-typescript)
