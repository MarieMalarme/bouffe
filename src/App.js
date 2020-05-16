import React from 'react'

import { Component, Div } from './lib/design.js'

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
      <Title>Recipes</Title>
    </Div>
  )
}

const Title = Component.heading.fs100.div()

export default App
