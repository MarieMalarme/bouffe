import React, { useState, useEffect } from 'react'

import { fetchData } from './lib/data.js'

import { Component, Div } from './lib/design.js'

export const Filters = ({ setFilters }) => {
  const [filtersList, setFiltersList] = useState([])

  useEffect(() => {
    fetchData('filters', setFiltersList)
  }, [filtersList.length])

  return (
    <Div flex alignCenter flexWrap>
      {filtersList.map((filter, i) => (
        <Filter key={filter} name={filter} setFilters={setFilters} />
      ))}
    </Div>
  )
}

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
