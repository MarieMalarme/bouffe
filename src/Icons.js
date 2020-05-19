import React from 'react'
import { Div } from './lib/design.js'

export const Clock = (props) => (
  <Icon {...props}>
    <path d="M97.77 65H65V31.77" />
    <circle cx="65" cy="65" r="53" />
  </Icon>
)

export const Oven = (props) => (
  <Icon {...props}>
    <circle cx="65" cy="65" r="55" />
    <circle cx="65" cy="65" r="40" />
    <circle cx="65" cy="65" r="25" />
  </Icon>
)

export const Serving = (props) => (
  <Icon {...props}>
    <circle cx="31.48" cy="33.05" r="19" />
    <circle cx="98.52" cy="33.05" r="19" />
    <circle cx="31.48" cy="96.95" r="19" />
    <circle cx="98.52" cy="96.95" r="19" />
  </Icon>
)

const Icon = ({ path, width = 25, children }) => (
  <Div flex alignCenter justifyCenter mr15>
    <svg width={width} viewBox="0 0 130 130">
      <g fill="none" stroke="black" strokeWidth={3}>
        {children}
      </g>
    </svg>
  </Div>
)
