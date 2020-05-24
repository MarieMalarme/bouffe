import React, { useState } from 'react'

import { Component } from './lib/design.js'
import { Filters } from './Filters.js'
import { Plus } from './Icons.js'
import { Modale } from './Modale.js'

const body = document.querySelector('body')

export const Controls = ({ filters, setFilters, recipes, setRecipes }) => {
  const [event, setEvent] = useState()

  body.style.overflow = event ? 'hidden' : 'auto'

  const filter = (target) =>
    filters.includes(target)
      ? setFilters(filters.filter((f) => f !== target))
      : setFilters([...filters, target])

  return (
    <Bar className="gradient-bg">
      <Filters setFilters={(target) => filter(target)} />
      <New event={event} setEvent={setEvent} />
      <Modale
        event={event}
        setEvent={setEvent}
        recipes={recipes}
        setRecipes={setRecipes}
      />
    </Bar>
  )
}

const Bar = Component.flex.justifyBetween.sticky.pb60.pt80.t0.mb20.w100p.div()

const New = ({ event, setEvent }) => {
  const clicked = event === 'click'
  return (
    <Button
      className="new-button"
      bgGrey9={clicked}
      shadowOut={clicked}
      onMouseOver={() => !clicked && setEvent('hover')}
      onMouseLeave={() => !clicked && setEvent()}
      onClick={() => setEvent(clicked ? '' : 'click')}
    >
      <Plus
        anim
        width={20}
        strokeWidth={7}
        stroke={clicked ? 'black' : 'white'}
        style={{ transform: `rotate(${clicked ? 45 : 0}deg)` }}
      />
    </Button>
  )
}

const Button = Component.zi1.flex.alignCenter.justifyCenter.h40.w40.bgGrey1.bRad50p.pointer.div()
