import React, { useState, useEffect } from 'react'

import { fetchData } from './lib/data.js'

import { Div } from './lib/design.js'
import { Controls } from './Controls.js'
import { Recipes } from './Recipes.js'

const postRecipe = (content, setRecipes) => {
  return fetch(`http://localhost:9000/recipes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((res) => setRecipes(res))
}

export const Home = () => {
  const [filters, setFilters] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetchData('recipes', setRecipes)
  }, [recipes.length])

  const filtered = recipes.filter((recipe) => {
    if (!recipe.tags) return false
    for (const s of filters) {
      if (recipe.tags.includes(s)) {
        return true
      }
    }
    return false
  })

  const displayed = filters.length ? filtered : recipes

  return (
    <Div ph100 pb100 pt30>
      <Controls
        filters={filters}
        setFilters={setFilters}
        recipes={recipes}
        setRecipes={setRecipes}
      />
      <Recipes recipes={displayed.reverse()} />
    </Div>
  )
}