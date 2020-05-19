import React, { useState } from 'react'

import { Div } from './lib/design.js'
import { Navigation } from './Navigation.js'
import { Recipes } from './Recipes.js'

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
    <Div ph100 pb100 pt30>
      <Navigation selected={selected} setSelected={setSelected} />
      <Recipes recipes={recipes} />
    </Div>
  )
}

export default App
