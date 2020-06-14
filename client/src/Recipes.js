import React, { useState, useRef } from 'react'

import { sendData } from './lib/data.js'
import { Component, Div } from './lib/design.js'

import { Specs } from './Specs.js'
import { Ingredients } from './Ingredients.js'
import { Steps } from './Steps.js'

export const Recipes = ({ recipes, setRecipes }) =>
  recipes.map((recipe) => (
    <Recipe key={recipe.title} recipe={recipe} setRecipes={setRecipes} />
  ))

const Recipe = ({ recipe, setRecipes, data, setData }) => {
  const [open, setOpen] = useState(false)
  const { title, ingredients, steps, specs, id } = recipe
  const className = open ? 'wrapper-open' : 'wrapper-closed'
  const ref = useRef(null)
  const height = ref.current && ref.current.getBoundingClientRect().height

  return (
    <Wrapper className={className} pb70={open}>
      <Tab onClick={() => setOpen(!open)}>
        <Div flex alignBaseline>
          <Title>{title}</Title>
          <Collapse open={open} />
        </Div>
        <Div
          onClick={() => {
            setData(recipe)
            setOpen({ editing: true })
          }}
        >
          Edit
        </Div>
        <Div
          onClick={() => {
            sendData('delete', 'recipes', { id }, setRecipes)
          }}
        >
          Delete
        </Div>
        <Specs specs={specs} />
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

const Collapse = ({ open }) => (
  <Div fs12 mono>
    {open ? '— Close' : '+ Open'}
  </Div>
)

const Wrapper = Component.bGrey6.w100p.mb30.animShadow.pb25.div()
const Title = Component.fs60.heading.mr20.div()
const Tab = Component.flex.justifyBetween.alignCenter.pointer.div()
const Content = Component.fs20.anim.pl10.div()
