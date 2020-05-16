import React, { useState } from 'react'

import { Component, Div, Span } from './lib/design.js'

import './App.css'

const recipes = [
  {
    title: 'Turkey honey mustard',
    ingredients: [
      { ingredient: 'Turkey leg' },
      { ingredient: 'Plantains' },
      { ingredient: 'Mustard', measure: '4 tbsp' },
      { ingredient: 'Soy sauce', measure: '2 tbsp' },
    ],
    steps: [
      'Preheat the oven',
      'Mix the sauce',
      'Glaze the leg with the sauce',
      'Put 10cl of water in the plate',
    ],
  },
  {
    title: 'Lamb with spices',
    ingredients: ['Lamb chops', 'Plantains'],
    steps: [
      'Preheat the oven',
      'Mix the spices',
      'Glaze the chops with the mixture',
    ],
  },
]

const App = () => {
  return (
    <Div pa100>
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} />
      ))}
    </Div>
  )
}

const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(true)
  const { title, ingredients, steps } = recipe
  const className = open ? 'wrapper-open' : 'wrapper'

  return (
    <Wrapper className={className} pb100={open} pb25={!open}>
      <Tab onClick={() => setOpen(!open)}>
        <Title>{title}</Title>
        <Div fs12 mono>
          {open ? '— Close' : '+ Open'}
        </Div>
      </Tab>
      {open && <Ingredients ingredients={ingredients} />}
    </Wrapper>
  )
}

const Wrapper = Component.bGrey6.w100p.mb30.animShadow.div()
const Title = Component.fs40.heading.mr20.div()
const Tab = Component.flex.alignBaseline.pointer.div()

const Ingredients = ({ ingredients }) => (
  <Div mt50 fs20>
    <Div mb30 pb10>
      Ingredients
    </Div>
    <Div>
      {ingredients.map(({ ingredient, measure }) => (
        <Ingredient ingredient={ingredient} measure={measure} />
      ))}
    </Div>
  </Div>
)

const Ingredient = ({ ingredient, measure }) => {
  const [checked, setChecked] = useState(false)
  return (
    <Div
      className="ingredient"
      pointer
      onClick={() => setChecked(!checked)}
      flex
      alignCenter
      mb25
    >
      <Checkbox className="checkbox">
        <CheckDot className={!checked ? 'check-dot' : ''} o100={checked} />
      </Checkbox>
      {ingredient}
      <Span ml10 grey5 italic>
        {measure}
      </Span>
    </Div>
  )
}

const Checkbox = Component.mr20.bRad50p.w20.h20.flex.alignCenter.justifyCenter.bgGrey9.div()
const CheckDot = Component.bRad50p.w5.h5.bgGrey2.animOpacity.o0.div()

export default App
