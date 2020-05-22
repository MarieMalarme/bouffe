import React, { useState, useEffect } from 'react'
import { useElement } from 'use-element'
import { capitalize, key } from './lib/toolbox.js'

import { Component, Div } from './lib/design.js'
import { Filters } from './Filters.js'
import { NumberInput, TextInput } from './Inputs.js'

const steps = [
  { name: 'title', content: 'text', required: true },
  { name: 'time', content: 'number', placeholder: 30 },
  { name: 'tags', content: Filters },
  // { name: 'ingredients', content: 'bullet' },
  // { name: 'steps', content: 'list' },
]

export const Modale = ({ event, setEvent }) => {
  const clicked = event === 'click'
  const hovered = event === 'hover'

  return (
    <Wrapper
      justifyFlexEnd={!clicked}
      noEvents={!clicked}
      o100={event}
      o0={!event}
    >
      {clicked && <Form steps={steps} setEvent={setEvent} />}
      {hovered && <Hovered />}
    </Wrapper>
  )
}

const Wrapper = Component.flex.lh80.justifyFlexEnd.flexColumn.w100vw.h100vh.fixed.bgGrey9.t0.l0.animOpacity.pa100.fs60.div()

const Form = ({ steps, setEvent }) => {
  const [current, setCurrent] = useState(steps[0])

  const index = steps.indexOf(current)
  const first = index === 0
  const last = index + 1 === steps.length

  const next = () => setCurrent(steps[index + 1])
  const prev = () => !first && setCurrent(steps[index - 1])
  const clear = () => {
    setCurrent(steps[0])
    setEvent()
  }

  return (
    <Steps
      autoComplete="off"
      onKeyDown={(e) => {
        const { enter, backspace, esc } = key(e)
        if (enter) last ? clear() : next()
        if (backspace) prev()
        if (esc) setEvent()
      }}
    >
      {steps.map((step, i) => (
        <Step key={step.name} step={step} current={current} />
      ))}
      <Navigation justifyBetween={!first} justifyFlexEnd={first}>
        <Button display={!first} action={prev} text="Back" />
        <Button display={!last} action={next} text="Next" />
        <Button display={last} action={clear} text="Submit" />
      </Navigation>
    </Steps>
  )
}

const Steps = Component.flex.flexColumn.justifyBetween.form()

const Button = ({ display, action, text }) => {
  if (!display) return null
  return (
    <Div noSelect pointer onClick={action}>
      {text}
    </Div>
  )
}

const Navigation = Component.flex.alignCenter.w100p.fixed.b0.r0.pa100.div()

const Step = ({ step, current }) => {
  const [ref, elem] = useElement(null)

  useEffect(() => {
    elem && elem.focus()
  })

  const { name, content, placeholder, required } = step

  const text = content === 'text'
  const number = content === 'number'

  const Content = (text && TextInput) || (number && NumberInput) || content

  return (
    <Div hidden={name !== current.name}>
      <Div className="fade-in" fixed heading fs60>
        {capitalize(name)}
      </Div>
      <Div mt160>
        <Content
          name={name}
          elemRef={ref}
          required={required}
          placeholder={placeholder || `Gimme some ${name}`}
        />
      </Div>
    </Div>
  )
}

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
