// eslint-disable-next-line no-unused-vars
import React from "react"

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const prodKey = `w7UUvSNSMjO6PEWIwMSDDUdWaEAKIWok`
  const devKey = `pYHBLk0Cnzt02FS3keymuYeqSx22iGRR`

  // use prod write key when in prod env, else use dev write key
  // note below, snippet wont render unless writeKey is truthy
  const writeKey = process.env.NODE_ENV === `production` ? prodKey : devKey
  const trackPage = `analytics.page();`

  // Segment's minified snippet (version 4.1.0)
  const snippet = `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.1.0";
    analytics.load('${writeKey}');
    ${trackPage}}}();
  `

  setHeadComponents([
    <script
      key="segment"
      dangerouslySetInnerHTML={{ __html: snippet }}
    />
  ])
}
