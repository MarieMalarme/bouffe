import React from 'react'
import { Div } from './lib/design.js'
import { Clock, Oven, Serving } from './Icons.js'

export const Specs = ({ specs }) => {
  if (!specs) return null
  return (
    <Div flex alignCenter justifyFlexEnd mr20>
      {Object.entries(specs).map(([key, spec]) => (
        <Spec key={key} type={key} spec={spec} />
      ))}
    </Div>
  )
}

const Spec = ({ type, spec }) => {
  if (!spec) return null
  const serving = type === 'serving'
  const time = type === 'time'
  const temp = type === 'temp'
  const Icon = (time && Clock) || (temp && Oven) || (serving && Serving)
  return (
    <Div flex alignCenter mr20={!serving} w110={temp} w120={time}>
      <Icon mr15 />
      <Div fs18>{spec}</Div>
    </Div>
  )
}
