import { clean, toDashCase, capitalize, array, generate } from './toolbox.js'
import {
  displays,
  flexAlignments,
  flexJustifications,
  positions,
  cursors,
  whiteSpaces,
  transitions,
  directions,
  overflows,
} from './css.js'

import { colors } from './colors.js'
import {
  pixels,
  pixelate,
  pixelateDirections,
  pixelateAxis,
  percentage,
} from './measures.js'

export const core = {
  heading: `font-family: 'Murmure'`,
  current: `font-family: 'GTZirkon'`,
  mono: `font-family: 'SpaceMono'`,
  italic: `font-style: italic`,
  flexColumn: `flex-direction: column`,
  flexRow: `flex-direction: row`,
  bRad50p: `border-radius: 50%`,
  w100vw: `width: 100vw`,
  maxW100p: `max-width: 100%`,
  h100vh: `height: 100vh`,
  maxH100p: `max-height: 100%`,
  fs100: `font-size: 100px`,
  noDecoration: `text-decoration: none`,
  bgNone: `background: none`,
  t0: `top: 0`,
  r0: `right: 0`,
  b0: `bottom: 0`,
  l0: `left: 0`,
  textLeft: `text-align: left`,
  textCenter: `text-align: center`,
  textRight: `text-align: right`,
  animOpacity: `transition: opacity 0.2s ease-in-out`,
  animShadow: `transition: box-shadow 0.2s ease-in-out`,
  anim: `transition: all 0.2s ease-in-out`,
  shadowIn: `box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
    inset -3px -2px 7px rgba(255, 255, 255, 0.6), 
    0px 0px 0px rgba(0, 0, 0, 0.1),
    0px 0px 0px rgba(255, 255, 255, 0.7)`,
  shadowOut: `box-shadow: inset 0px 0px 0px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px rgba(255, 255, 255, 0.6), 
    3px 3px 7px rgba(0, 0, 0, 0.1),
    -4px -4px 7px rgba(255, 255, 255, 0.7)`,
  noEvents: `pointer-events: none`,
  noSelect: `user-select: none`,
  shrink0: `flex-shrink: 0`,
}

const suffixed = [
  {
    selector: `noScrollbar`,
    suffix: `::-webkit-scrollbar`,
    rule: `display: none`,
  },
  {
    selector: `hoverShadow`,
    suffix: `:hover`,
    rule: `box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);`,
  },
  {
    selector: `hoverO0`,
    suffix: `:hover`,
    rule: `opacity: 0`,
  },
  {
    selector: `hoverO100`,
    suffix: `:hover`,
    rule: `opacity: 1`,
  },
  ...colors.map(([color]) => ({
    selector: `hover${capitalize(color)}`,
    suffix: ':hover',
    rule: `color: var(--${color})`,
  })),
]

export const generated = {
  color: generate(colors, ([color]) => ({ [color]: `color: var(--${color})` })),
  backgroundColor: generate(colors, ([color]) => ({
    [`bg${capitalize(color)}`]: `background-color: var(--${color})`,
  })),
  fontSize: generate(array(51), (i) => ({
    [`fs${i + 10}`]: `font-size: ${i + 10}px`,
  })),
  margin: { ...pixelateDirections('margin'), ...pixelateAxis('margin') },
  padding: { ...pixelateDirections('padding'), ...pixelateAxis('padding') },
  width: { ...percentage('width'), ...pixelate('width') },
  height: { ...percentage('height'), ...pixelate('height') },
  display: generate(displays, (d) => ({ [d]: `display: ${toDashCase(d)}` })),
  flex: {
    ...generate(flexAlignments, (a) => ({
      [`align${capitalize(a)}`]: `align-items: ${toDashCase(a)}`,
    })),
    ...generate(flexJustifications, (j) => ({
      [`justify${capitalize(
        j.replace('space', ''),
      )}`]: `justify-content: ${toDashCase(j)}`,
    })),
    ...generate(['noWrap', 'wrap', 'wrapReverse'], (w) => ({
      [`flex${capitalize(w)}`]: `flex-wrap: ${toDashCase(w)}`,
    })),
  },
  border: generate(directions, ([suffix, direction]) => ({
    [`b${suffix}`]: `border${direction}: solid 1px black`,
  })),
  borderColor: generate(colors, ([color]) => ({
    [`b${capitalize(color)}`]: `border-color: var(--${color})`,
  })),
  position: generate(positions, (p) => ({ [p]: `position: ${p}` })),
  cursor: generate(cursors, (c) => ({
    [c]: `cursor: ${toDashCase(c)}`,
  })),
  lineHeight: generate(array(71), (i) => ({
    [`lh${i + 10}`]: `line-height: ${i + 10}px`,
  })),
  whiteSpace: generate(whiteSpaces, (w) => ({
    [`ws${capitalize(w)}`]: `white-space: ${toDashCase(w)}`,
  })),
  transition: generate(transitions, (t) => ({
    [`anim${capitalize(t)}`]: `transition: ${toDashCase(t)} 0.2s ease-in-out`,
  })),
  zIndex: generate(array(21), (i) => ({
    [`zi${i}`]: `z-index: ${i}`,
  })),
  opacity: generate(array(21), (i) => ({
    [`o${i * 5}`]: `opacity: ${(i * 5) / 100}`,
  })),
  borderRadius: generate(array(26), (i) => ({
    [`bRad${i}`]: `border-radius: ${i}px`,
  })),
  overflow: generate(overflows, (o) => ({
    [`of${capitalize(o)}`]: `overflow: ${o}`,
  })),
}

const classes = {
  ...core,
  ...Object.assign({}, ...Object.values(generated)),
  ...Object.assign(
    {},
    ...suffixed.map(({ selector, suffix, rule }) => ({
      [`${selector}${suffix}`]: `${rule}`,
    })),
  ),
}

const injectCSS = (classes) =>
  document.head.appendChild(
    Object.assign(document.createElement('style'), {
      type: 'text/css',
      id: 'mm-flags',
      innerHTML: [
        ':root {',
        '/* measures */',
        pixels.join('\n'),
        '/* colors */',
        colors.map(([color, value]) => `  --${color}: ${value};`).join('\n'),
        '}\n',
        Object.entries(classes)
          .map(([selector, rules]) => `.${selector} { ${rules}; }`)
          .join('\n'),
      ].join('\n'),
    }),
  )

injectCSS(classes)

export const flags = Object.assign(
  ...Object.keys(classes).map((c) => ({ [clean(c)]: clean(c) })),
)
