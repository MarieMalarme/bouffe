import React from 'react'
import { Router } from '@reach/router'

import { Home } from './Home.js'
import { Agenda } from './Agenda.js'

import './App.css'

const App = () => (
  <Router>
    <Home path="/" />
    <Agenda path="/agenda" />
  </Router>
)

export default App
