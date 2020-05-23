import React, { useState, useEffect } from 'react'
import { capitalize, key } from './lib/toolbox.js'

import { Component, Div } from './lib/design.js'
import { Filters } from './Filters.js'
import {
  NumberInput,
  TextInput,
  BulletsInput,
  ListInput,
  warn,
} from './Inputs.js'

const steps = [
  { name: 'title', content: 'text', required: true },
  { name: 'ingredients', content: 'bullets', required: true },
  { name: 'time', content: 'number', placeholder: 30 },
  { name: 'tags', content: Filters },
  { name: 'steps', content: 'list' },
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
          steps={steps}
          setEvent={setEvent}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      )}
      {hovered && <Hovered />}
    </Wrapper>
  )
}

const Wrapper = Component.flex.lh80.justifyFlexEnd.flexColumn.w100vw.h100vh.fixed.bgGrey9.t0.l0.animOpacity.pa100.fs60.div()

const Form = ({ steps, setEvent, recipes, setRecipes }) => {
  const [current, setCurrent] = useState(steps[0])

  const index = steps.indexOf(current)
  const first = index === 0
  const last = index + 1 === steps.length

  const [data, setData] = useState({})

  const filled = data[current.name]
  const missing = current.required && !filled

  const next = () => (missing ? warn(current) : setCurrent(steps[index + 1]))
  const prev = () => !first && setCurrent(steps[index - 1])
  const submit = () => {
    setRecipes([...recipes, { ...data }])
    setCurrent(steps[0])
    setEvent()
  }

  return (
    <Div flex flexColumn justifyBetween h100p>
      <Steps
        autoComplete="off"
        onKeyDown={(e) => {
          const { enter, backspace, esc } = key(e)
          if (esc) setEvent()
          if (backspace) prev()
          if (enter) last ? submit() : next()
        }}
      >
        {steps.map((step, i) => (
          <Step
            step={step}
            data={data}
            key={step.name}
            setData={setData}
            current={current}
          />
        ))}
      </Steps>
      <Navigation justifyBetween={!first} justifyFlexEnd={first}>
        <Button display={!first} action={prev} text="Back" />
        <Button display={!last} action={next} text="Next" grey8={missing} />
        <Button display={last} action={submit} text="Submit" />
      </Navigation>
    </Div>
  )
}

const Steps = Component.flex.flexColumn.justifyBetween.h100p.form()

const Button = ({ display, action, text, ...props }) => {
  if (!display) return null
  return (
    <Div noSelect pointer onClick={action} {...props}>
      {text}
    </Div>
  )
}

const Navigation = Component.flex.alignCenter.w100p.mt50.div()

const Step = ({ step, current, data, setData }) => {
  const [ref, setRef] = useState()

  useEffect(() => {
    if (!ref) return
    ref.focus()
  })

  const { name, content, placeholder, required } = step

  const text = content === 'text'
  const number = content === 'number'
  const bullets = content === 'bullets'
  const list = content === 'list'

  const Content =
    (text && TextInput) ||
    (number && NumberInput) ||
    (bullets && BulletsInput) ||
    (list && ListInput) ||
    content

  return (
    <Div hidden={name !== current.name} h100p mt160>
      <Label className="fade-in">{capitalize(name)}</Label>
      <Div h100p relative ofHidden>
        <Content
          name={name}
          data={data}
          setData={setData}
          elemRef={setRef}
          current={current}
          required={required}
          placeholder={placeholder || `Gimme some ${name}`}
        />
      </Div>
    </Div>
  )
}

const Label = Component.fixed.heading.fs60.div()

const Hovered = () => (
  <Div>
    <Div grey7>
      Time to try new tasty food
      <br />
      and make that list longer
    </Div>
    Click to add a new recipe
  </Div>
)
