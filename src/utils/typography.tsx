// @ts-ignore
import * as Typography from 'typography'

const typography = new Typography({
  baseFontSize: '15px',
  baseLineHeight: 1.5,
  bodyFontFamily: ['Roboto', 'Roboto Condensed', 'Arial', 'sans-serif'],
  googleFonts: [
    {
      name: 'Roboto',
      styles: [
        '400',
      ],
    },
    {
      name: 'Roboto Condensed',
      styles: [
        '400',
      ],
    },
  ],
  headerFontFamily: ['Roboto', 'Roboto Condensed', 'Arial', 'sans-serif'],
  scaleRatio: 5.2,
    // See below for the full list of options.
})

// Output CSS as string.
// mtypography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
// typography.injectStyles()
// })

export default typography
