import React, { useState, useEffect } from 'react'

import { sendData } from './lib/data.js'
import { capitalize, key } from './lib/toolbox.js'

import { Component, Div } from './lib/design.js'
import { Filters } from './Filters.js'
import { NumberInput, TextInput, BulletsInput, warn } from './Inputs.js'

const stages = [
  { name: 'title', content: 'text', required: true },
  { name: 'ingredients', content: 'bullets', required: true },
  { name: 'time', content: 'number' },
  { name: 'tags', content: 'tags' },
  { name: 'steps', content: 'orders', required: true },
]

export const Modale = ({ event, setEvent, recipes, setRecipes }) => {
  const clicked = event === 'click'
  const hovered = event === 'hover'

  return (
    <Wrapper
      justifyFlexEnd={!clicked}
      noEvents={!clicked}
      o100={event}
      o0={!event}
    >
      {clicked && (
        <Form
          stages={stages}
          setEvent={setEvent}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      )}
      {hovered && <Hovered />}
    </Wrapper>
  )
}

const Wrapper = Component.flex.justifyFlexEnd.flexColumn.w100vw.h100vh.fixed.bgGrey9.t0.l0.animOpacity.pa100.fs60.div()

const Form = ({ stages, setEvent, recipes, setRecipes }) => {
  const [current, setCurrent] = useState(stages[0])

  const index = stages.indexOf(current)
  const first = index === 0
  const last = index + 1 === stages.length

  const id = Math.max(...recipes.map((r) => r.id)) + 1

  const [data, setData] = useState({ id })

  const filled = data[current.name]
  const missing = current.required && !filled

  const next = () => (missing ? warn(current) : setCurrent(stages[index + 1]))
  const prev = () => !first && setCurrent(stages[index - 1])
  const submit = () => {
    sendData('post', 'recipes', data, setRecipes)
    setCurrent(stages[0])
    setEvent()
  }

  return (
    <Div flex flexColumn justifyBetween h100p>
      <Stages
        autoComplete="off"
        onKeyDown={(e) => {
          const { enter, backspace, esc } = key(e)
          if (esc) setEvent()
          if (backspace) prev()
          if (enter) last ? submit() : next()
        }}
      >
        {stages.map((stage, i) => (
          <Stage
            stage={stage}
            data={data}
            key={stage.name}
            setData={setData}
            current={current}
          />
        ))}
      </Stages>
      <Navigation justifyBetween={!first} justifyFlexEnd={first}>
        <Button display={!first} action={prev} text="Back" />
        <Button display={!last} action={next} text="Next" grey8={missing} />
        <Button display={last} action={submit} text="Submit" />
      </Navigation>
    </Div>
  )
}

const Stages = Component.flex.flexColumn.justifyBetween.h100p.form()

const Button = ({ display, action, text, ...props }) => {
  if (!display) return null
  return (
    <Div noSelect pointer onClick={action} {...props}>
      {text}
    </Div>
  )
}

const Navigation = Component.flex.alignCenter.w100p.mt50.div()

const Stage = ({ stage, current, data, setData }) => {
  const [ref, setRef] = useState()

  useEffect(() => {
    if (!ref) return
    ref.focus()
  })

  const { name, content, required } = stage

  const text = content === 'text'
  const number = content === 'number'
  const bullets = content === 'bullets'
  const orders = content === 'orders'
  const tags = content === 'tags'

  const list = bullets || orders

  const Content =
    (text && TextInput) ||
    (number && NumberInput) ||
    (list && BulletsInput) ||
    (tags && Filters) ||
    content

  const filter = (target) => {
    if (!data[name]) return setData({ ...data, [name]: [target] })

    const add = [...data[name], target]
    const remove =
      data[name].includes(target) && data[name].filter((f) => f !== target)

    setData({
      ...data,
      [name]: remove || add,
    })
  }

  const filters = tags && { setFilters: (target) => filter(target) }
  const elemRef = !list && { elemRef: setRef }
  const numbers = orders && { type: 'numbers' }

  return (
    <Div hidden={name !== current.name} h100p mt160>
      <Label className="fade-in">{capitalize(name)}</Label>
      <Div h100p={list} relative={list} ofHidden={list}>
        <Content
          name={name}
          data={data}
          setData={setData}
          current={current}
          required={required}
          {...filters}
          {...elemRef}
          {...numbers}
        />
      </Div>
    </Div>
  )
}

const Label = Component.fixed.heading.fs60.div()

const Hovered = () => (
  <Div lh80>
    <Div grey7>
      Time to try new tasty food
      <br />
      and make that list longer
    </Div>
    Click to add a new recipe
  </Div>
)
