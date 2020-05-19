import React from 'react'
import { Component } from './lib/design.js'
import { Filters } from './Filters.js'
import { Plus } from './Icons.js'

export const Navigation = ({ selected, setSelected }) => (
  <Bar className="gradient-bg">
    <Filters selected={selected} setSelected={setSelected} />
    <New />
  </Bar>
)

const New = () => (
  <Button className="new-button">
    <Plus stroke="white" width={20} strokeWidth={7} />
    <Text className="new-text">New recipe</Text>
  </Button>
)

const Button = Component.flex.relative.alignCenter.justifyCenter.h40.w40.bgGrey1.bRad50p.pointer.hoverShadow.animShadow.div()
const Text = Component.noEvents.absolute.w100.mr40.mono.fs13.grey4.animOpacity.o0.r0.div()
const Bar = Component.flex.justifyBetween.sticky.pb60.pt80.t0.mb20.w100p.div()
