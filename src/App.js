import React, { useState } from 'react'

import { Div } from './lib/design.js'
import { Controls } from './Controls.js'
import { Recipes } from './Recipes.js'

import { recipes as data } from './recipes.data.js'

import './App.css'

const App = () => {
  const [selected, setSelected] = useState([])
  const [recipes, setRecipes] = useState(data)

  const filtered = recipes.filter((recipe) => {
    if (!recipe.tags) return false
    for (const s of selected) {
      if (recipe.tags.includes(s)) {
        return true
      }
    }
    return false
  })

  const displayed = selected.length ? filtered : recipes

  return (
    <Div ph100 pb100 pt30>
      <Controls
        selected={selected}
        setSelected={setSelected}
        recipes={recipes}
        setRecipes={setRecipes}
      />
      <Recipes recipes={[...displayed].reverse()} />
    </Div>
  )
}

export default App
