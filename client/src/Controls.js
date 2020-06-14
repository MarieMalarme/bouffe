import React, { useState } from 'react'

import { Component } from './lib/design.js'
import { Filters } from './Filters.js'
import { Plus } from './Icons.js'
import { Modale } from './Modale.js'

const body = document.querySelector('body')

export const Controls = ({
  data,
  setData,
  filters,
  setFilters,
  recipes,
  setRecipes,
}) => {
  const [open, setOpen] = useState({ clicked: false, hovered: false })

  body.style.overflow = open ? 'hidden' : 'auto'

  const filter = (target) =>
    filters.includes(target)
      ? setFilters(filters.filter((f) => f !== target))
      : setFilters([...filters, target])

  return (
    <Bar className="gradient-bg">
      <Filters setFilters={(target) => filter(target)} />
      <New
        recipes={recipes}
        setData={setData}
        data={data}
        open={open}
        setOpen={setOpen}
      />
      <Modale
        open={open}
        setOpen={setOpen}
        recipes={recipes}
        setRecipes={setRecipes}
        data={data}
        setData={setData}
      />
    </Bar>
  )
}

const Bar = Component.flex.justifyBetween.sticky.pb60.pt80.t0.mb20.w100p.div()

const New = ({ recipes, data, setData, open, setOpen }) => {
  const { clicked } = open

  return (
    <Button
      bgGrey9={clicked}
      shadowOut={clicked}
      onMouseEnter={() => !clicked && setOpen({ hovered: true })}
      onMouseLeave={() => !clicked && setOpen({ hovered: false })}
      onClick={() => {
        const emptyData = !Object.values(data).length
        if (emptyData) {
          const id = Math.max(...recipes.map((r) => r.id)) + 1
          setData({ id })
        }
        setOpen({ clicked: !clicked, hovered: false })
      }}
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

const Button = Component.zi1.flex.alignCenter.justifyCenter.shrink0.h40.w40.bgGrey1.bRad50p.pointer.div()
