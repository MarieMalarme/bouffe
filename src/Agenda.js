import React, { useState } from 'react'
import { capitalize } from './lib/toolbox.js'

import { Component, Div } from './lib/design.js'

const weekdays = [
  { day: 'Mon', tasks: [] },
  { day: 'Tue', tasks: [] },
  { day: 'Wed', tasks: [] },
  { day: 'Thu', tasks: [] },
  {
    day: 'Fri',
    tasks: [
      'Pharmacy / Groceries',
      'Harmonize exercise 1',
      'Polish CSS exercise 2',
      'Write exercise 3',
      'Convert to .md files / push',
    ],
  },
  {
    day: 'Sat',
    tasks: ['Bike / playa', 'Write exercise 4', 'Debug Rusch'],
  },
  { day: 'Sun', tasks: ['Write exercise 5'] },
]
const displays = [
  { type: 'boxes', min: 200, max: 400 },
  { type: 'lines', min: 75, max: 300 },
]

export const Agenda = () => {
  const [display, setDisplay] = useState(displays[0])
  const [height, setHeight] = useState(150)

  const { type } = display

  return (
    <Div pa100 flex flexColumn>
      <Header>
        <Title heading fs60>
          Agenda
        </Title>
        <Controls
          display={display}
          setDisplay={setDisplay}
          height={height}
          setHeight={setHeight}
        />
      </Header>
      <Weekdays type={type} height={height} setHeight={setHeight} />
    </Div>
  )
}

const Title = Component.heading.fs60.div()
const Header = Component.mb50.flex.justifyBetween.w100p.flex.alignCenter.justifyBetween.div()

const Controls = ({ display, setDisplay, height, setHeight }) => {
  const { type, min, max } = display
  return (
    <Div flex alignCenter>
      <Range min={min} max={max} height={height} setHeight={setHeight} />
      <Toggles type={type} setDisplay={setDisplay} />
    </Div>
  )
}

const Range = ({ min, max, height, setHeight }) => (
  <Div flex alignCenter mr50>
    <Div mr20>Row height</Div>
    <input
      type="range"
      min={min}
      max={max}
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />
  </Div>
)

const Toggles = ({ type, setDisplay }) =>
  displays.map((d) => {
    const selected = d.type === type
    return (
      <Button
        key={d.type}
        pointer={!selected}
        animColor={!selected}
        hoverBlack={!selected}
        noEvents={selected}
        shadowOut={!selected}
        shadowIn={selected}
        onClick={() => !selected && setDisplay(d)}
      >
        {capitalize(d.type)}
      </Button>
    )
  })

const Button = Component.grey4.pv10.ph25.bRad25.fs13.ml30.mono.div()

const Weekdays = ({ type, height, setHeight }) => {
  const lines = type === 'lines'
  const boxes = type === 'boxes'
  const Test = (lines && Line) || (boxes && Box)
  return (
    <Div flex={boxes} flexWrap={boxes} justifyBetween={boxes}>
      {weekdays.map(({ day, tasks }, i) => (
        <Test
          key={day}
          style={{ minHeight: lines ? '75px' : '200px', height: `${height}px` }}
          className={boxes ? 'agenda-box' : ''}
          w25p={boxes && i !== 6}
          w50p={boxes && i === 6}
          bt={lines && i !== 0}
        >
          <Div fs30>{day}</Div>
          <Div mt45>
            {tasks.map((task) => (
              <Div mb20 flex alignCenter>
                <Dot />
                <Div>{task}</Div>
              </Div>
            ))}
          </Div>
        </Test>
      ))}
    </Div>
  )
}

const Dot = Component.h15.w15.mr20.bRad50p.bgGrey9.shadowOut.div()

const Line = Component.pv20.bGrey5.div()
const Box = Component.animShadow.pa30.bgGrey9.flex.flexColumn.alignFlexStart.div()
