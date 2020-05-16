import React from 'react'

import { Component, Div } from './lib/design.js'

import './App.css'

const App = () => {
  return (
    <Div pa100>
      <Title>Recipes</Title>
    </Div>
  )
}

const Title = Component.heading.fs100.div()

export default App
