import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'

import { Div } from './lib/design.js'
import { Controls } from './Controls.js'
import { Recipes } from './Recipes.js'
import { Agenda } from './Agenda.js'

import { recipes as data } from './recipes.data.js'

import './App.css'

const post = (content, setState) => {
  return fetch(`http://localhost:9000/test`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then((res) => res.json())
    .then((res) => setState(res))
}

const App = () => {
  const [state, setState] = useState([])

  const fetchData = async () => {
    const response = await fetch('http://localhost:9000/test')
    const data = await response.json()
    if (!data) return
    setState(data)
  }

  useEffect(() => {
    fetchData()
  }, [state.length])

  return (
    <Div onClick={() => post({ id: 100, title: 'test test' }, setState)}>
      {state.map((s) => s.title)}
    </Div>
  )
}

// <Router>
// <Home path="/" />
// <Agenda path="/agenda" />
// </Router>

const Home = () => {
  const [filters, setFilters] = useState([])
  const [recipes, setRecipes] = useState(data)

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
      <Recipes recipes={[...displayed].reverse()} />
    </Div>
  )
}

export default App
