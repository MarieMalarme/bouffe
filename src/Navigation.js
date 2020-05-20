import React, { useState } from 'react'
import { Component, Div } from './lib/design.js'
import { Filters } from './Filters.js'
import { Plus } from './Icons.js'

export const Navigation = ({ selected, setSelected }) => {
  const [hover, setHover] = useState(false)
  return (
    <Bar className="gradient-bg">
      <Filters selected={selected} setSelected={setSelected} />
      <New hover={hover} setHover={setHover} />
      <Modale hover={hover} />
    </Bar>
  )
}

const New = ({ hover, setHover }) => {
  return (
    <Button
      className="new-button"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Plus stroke="white" width={20} strokeWidth={7} />
    </Button>
  )
}

const Button = Component.zi1.flex.alignCenter.justifyCenter.h40.w40.bgGrey1.bRad50p.pointer.hoverShadow.animShadow.div()
const Bar = Component.flex.justifyBetween.sticky.pb60.pt80.t0.mb20.w100p.div()

const Modale = ({ hover }) => (
  <Wrapper o100={hover} o0={!hover}>
    <Div grey7>
      Time to try new tasty food
      <br />
      and make that list longer
    </Div>
    <Div>Click to add a new recipe</Div>
  </Wrapper>
)

const Wrapper = Component.flex.lh80.justifyFlexEnd.flexColumn.noEvents.w100vw.h100vh.fixed.bgGrey9.t0.l0.animOpacity.pa100.fs60.div()
