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
    <circle cx="35" cy="35" r="17" />
    <circle cx="95" cy="35" r="17" />
    <circle cx="35" cy="95" r="17" />
    <circle cx="95" cy="95" r="17" />
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
