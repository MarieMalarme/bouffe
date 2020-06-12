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

export const Plus = (props) => (
  <Icon {...props}>
    <path d="M65 15v100M115 65H15" />
  </Icon>
)

export const Minus = (props) => (
  <Icon {...props}>
    <path d="M115 65H15" />
  </Icon>
)

const Icon = ({
  path,
  width = 25,
  stroke = 'black',
  strokeWidth = 3,
  children,
  ...props
}) => (
  <Div flex alignCenter justifyCenter {...props}>
    <svg width={width} viewBox="0 0 130 130">
      <g fill="none" stroke={stroke} strokeWidth={strokeWidth}>
        {children}
      </g>
    </svg>
  </Div>
)
