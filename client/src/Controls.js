import React from 'react'

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
  modale,
  setModale,
}) => {
  const { fulfilling, hovering } = modale
  body.style.overflow = fulfilling || hovering ? 'hidden' : 'auto'

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
        modale={modale}
        setModale={setModale}
      />
      <Modale
        modale={modale}
        setModale={setModale}
        recipes={recipes}
        setRecipes={setRecipes}
        data={data}
        setData={setData}
      />
    </Bar>
  )
}

const Bar = Component.flex.justifyBetween.sticky.pb60.pt80.t0.mb20.w100p.div()

const New = ({ recipes, data, setData, modale, setModale }) => {
  const { fulfilling, editing } = modale

  return (
    <Button
      bgGrey9={fulfilling}
      shadowOut={fulfilling}
      onMouseEnter={() => !fulfilling && setModale({ hovering: true })}
      onMouseLeave={() => !fulfilling && setModale({ hovering: false })}
      onClick={() => {
        const emptyData = !Object.values(data).length
        if (emptyData) {
          const id = Math.max(...recipes.map((r) => r.id)) + 1
          setData({ id })
        }

        if (editing) {
          setData({})
          setModale({ editing: false, fulfilling: false, hovering: false })
          return
        }

        setModale({
          fulfilling: !fulfilling,
          hovering: false,
        })
      }}
    >
      <Plus
        anim
        width={20}
        strokeWidth={7}
        stroke={fulfilling ? 'black' : 'white'}
        style={{ transform: `rotate(${fulfilling ? 45 : 0}deg)` }}
      />
    </Button>
  )
}

const Button = Component.zi1.flex.alignCenter.justifyCenter.shrink0.h40.w40.bgGrey1.bRad50p.pointer.div()
