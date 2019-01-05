// @ts-ignore
import * as Typography from 'typography'

const typography = new Typography({
  baseFontSize: '15px',
  baseLineHeight: 1.5,
  bodyFontFamily: ['Roboto Condensed', 'Roboto', 'Arial', 'sans-serif'],
  bodyGray: 50,
  boldWeight: 700,
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
        '700',
      ],
    },
  ],
  headerFontFamily: ['Roboto Condensed', 'Roboto', 'Arial', 'sans-serif'],
  headerGray: 50,
  headerWeight: 700,
  overrideStyles: (scale: Typography.TypographyOptions, rhythm: Typography.rhythm) => ({
    body: {
      letterSpacing: '.05em',
    },
  }),
  scaleRatio: 2.5,
})

const { rhythm, scale } = typography;
export { rhythm, scale, typography as default };

//export default typography
