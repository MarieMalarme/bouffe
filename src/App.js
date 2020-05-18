import React, { useState, useRef } from 'react'

import { Component, Div, Span } from './lib/design.js'

import { recipes as all } from './recipes.data.js'

import './App.css'

const App = () => {
  const [selected, setSelected] = useState([])

  const filtered = all.filter((recipe) => {
    if (!recipe.tags) return false
    for (const s of selected) {
      if (recipe.tags.includes(s)) {
        return true
      }
    }
    return false
  })

  const recipes = selected.length ? filtered : all

  return (
    <Div pa100>
      <Filters selected={selected} setSelected={setSelected} />
      {recipes.map((recipe) => (
        <Recipe key={recipe.title} recipe={recipe} />
      ))}
    </Div>
  )
}

const filters = ['Salty', 'Sweet', 'Meat', 'Vegetarian', 'Asian', 'French']

const Filters = ({ selected, setSelected }) => (
  <Div flex mb50>
    {filters.map((filter, i) => (
      <Filter
        key={filter}
        name={filter}
        selected={selected}
        setSelected={setSelected}
      />
    ))}
  </Div>
)

const Filter = ({ name, isSelected = false, selected, setSelected }) => {
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
        selected.includes(name)
          ? setSelected(selected.filter((f) => f !== name))
          : setSelected([...selected, name])
      }}
    >
      {name}
    </Shape>
  )
}

const Shape = Component.bRad20.anim.pointer.mb40.mr25.fs16.ph20.pv10.shadowOut.div()

const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(false)
  const { title, ingredients, steps } = recipe
  const className = open ? 'wrapper-open' : 'wrapper-closed'
  const ref = useRef(null)
  const height = ref.current && ref.current.getBoundingClientRect().height

  return (
    <Wrapper className={className} pb70={open}>
      <Tab onClick={() => setOpen(!open)}>
        <Title>{title}</Title>
        <Div fs12 mono>
          {open ? '— Close' : '+ Open'}
        </Div>
      </Tab>
      <Content
        o0={!open}
        o100={open}
        style={{
          overflow: open ? 'visible' : 'hidden',
          maxHeight: open ? height : 0,
          marginLeft: '-10px',
        }}
      >
        <div ref={ref}>
          <Ingredients ingredients={ingredients} />
          <Steps steps={steps} />
        </div>
      </Content>
    </Wrapper>
  )
}

const Wrapper = Component.bGrey6.w100p.mb30.animShadow.pb25.div()
const Title = Component.fs60.heading.mr20.div()
const Tab = Component.flex.alignBaseline.pointer.div()
const Content = Component.fs20.anim.pl10.div()

const Steps = ({ steps }) => (
  <Div mt45 fs35>
    {steps.map((step, i) => (
      <Step key={`step-${i}`} step={step} number={i + 1} />
    ))}
  </Div>
)

const Step = ({ step, number }) => (
  <Div flex alignCenter mb25>
    <StepNumber>{number}</StepNumber>
    {step}.
  </Div>
)

const StepNumber = Component.grey7.o80.w35.mr10.div()

const Ingredients = ({ ingredients }) => (
  <Div pt70 flex flexWrap>
    {ingredients.map(({ ingredient, quantity }, i) => (
      <Ingredient
        key={`${ingredient}`}
        ingredient={ingredient}
        quantity={quantity}
      />
    ))}
  </Div>
)

const Ingredient = ({ ingredient, quantity }) => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckIngredient
      className="ingredient"
      onClick={() => setChecked(!checked)}
    >
      <Checkbox>
        <CheckDot className={!checked ? 'check-dot' : ''} o100={checked} />
      </Checkbox>
      {ingredient}
      <Span ml10 grey5 italic>
        {quantity}
      </Span>
    </CheckIngredient>
  )
}

const CheckIngredient = Component.w25p.pr15.flex.alignCenter.mb25.pointer.div()
const Checkbox = Component.mr20.bRad50p.w25.h25.fs12.flex.alignCenter.justifyCenter.bgGrey9.shadowIn.div()
const CheckDot = Component.bRad50p.w5.h5.bgGrey2.animOpacity.o0.div()

export default App
