import React, { useState } from 'react'
import { Component, Div } from './lib/design.js'

const filters = ['Salty', 'Sweet', 'Meat', 'Vegetarian', 'Asian', 'French']

export const Filters = ({ setFilters }) => (
  <Div flex alignCenter flexWrap>
    {filters.map((filter, i) => (
      <Filter key={filter} name={filter} setFilters={setFilters} />
    ))}
  </Div>
)

const Filter = ({ name, isSelected = false, setFilters }) => {
  const [active, setActive] = useState(isSelected)

  return (
    <Shape
      bgGrey1={active}
      white={active}
      grey5={!active}
      bgGrey9={!active}
      hoverBlack={!active}
      onClick={() => {
        setActive(!active)
        setFilters(name)
      }}
    >
      {name}
    </Shape>
  )
}

const Shape = Component.noSelect.bRad20.anim.mb25.pointer.mr25.fs16.ph20.pv10.shadowOut.div()
