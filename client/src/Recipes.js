import React, { useState } from 'react'

import { sendData } from './lib/data.js'
import { Component, Div } from './lib/design.js'

import { Specs } from './Specs.js'
import { Ingredients } from './Ingredients.js'
import { Steps } from './Steps.js'

export const Recipes = ({ recipes, setRecipes, setData, setModale }) =>
  recipes.map((recipe) => (
    <Recipe
      key={recipe.title}
      recipe={recipe}
      setRecipes={setRecipes}
      setData={setData}
      setModale={setModale}
    />
  ))

const Recipe = ({ recipe, setRecipes, setData, setModale }) => {
  const [open, setOpen] = useState(false)
  const { title, ingredients, steps, specs } = recipe
  const className = open ? 'wrapper-open' : 'wrapper-closed'
  const [content, setContent] = useState(null)
  const height = content && content.getBoundingClientRect().height

  return (
    <Wrapper className={className} pb70={open}>
      <Tab>
        <TabOpener onClick={() => setOpen(!open)}>
          <Title>{title}</Title>
          <Collapse open={open} />
        </TabOpener>
        <Div flex alignCenter>
          <Buttons
            recipe={recipe}
            setData={setData}
            setModale={setModale}
            setRecipes={setRecipes}
          />
          <Specs specs={specs} />
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
        <Div elemRef={setContent}>
          <Ingredients ingredients={ingredients} />
          <Steps steps={steps} />
        </Div>
      </Content>
    </Wrapper>
  )
}

const Buttons = ({ recipe, setData, setModale, setRecipes }) => {
  const { id } = recipe
  return (
    <Div flex alignCenter mr50 pr50 br>
      <Button
        text="Edit"
        onClick={() => {
          setData(recipe)
          setModale({ editing: true, fulfilling: true })
        }}
      />
      <Button
        text="Delete"
        onClick={() => {
          sendData('delete', 'recipes', { id }, setRecipes)
        }}
      />
    </Div>
  )
}

const Button = ({ text, onClick }) => (
  <Div ml50 pointer onClick={onClick}>
    {text}
  </Div>
)

const Collapse = ({ open }) => (
  <Div fs12 mono>
    {open ? '— Close' : '+ Open'}
  </Div>
)

const Wrapper = Component.bGrey6.w100p.mb30.animShadow.pb25.div()
const Title = Component.fs60.heading.mr20.div()
const Tab = Component.flex.justifyBetween.alignCenter.div()
const TabOpener = Component.w100p.pointer.flex.alignBaseline.div()
const Content = Component.fs20.anim.pl10.div()
