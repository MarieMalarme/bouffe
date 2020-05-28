import React, { Fragment, useState } from 'react'
import { capitalize } from './lib/toolbox.js'

import { Component, Div } from './lib/design.js'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const displays = ['lines', 'boxes']

export const Agenda = ({}) => {
  const [display, setDisplay] = useState('lines')
  const Weekdays =
    (display === 'lines' && Lines) || (display === 'boxes' && Boxes)
  return (
    <Div pa100 h100vh flex flexColumn>
      <Div flex justifyBetween>
        <Div heading fs60 mb40>
          Agenda
        </Div>
        <Toggles display={display} setDisplay={setDisplay} />
      </Div>
      <Weekdays />
    </Div>
  )
}

const Toggles = ({ display, setDisplay }) => (
  <Div flex alignCenter>
    {displays.map((d) => {
      const selected = d === display
      return (
        <Button
          pointer={!selected}
          animColor={!selected}
          hoverBlack={!selected}
          noEvents={selected}
          shadowOut={!selected}
          shadowIn={selected}
          onClick={() => !selected && setDisplay(d)}
        >
          {capitalize(d)}
        </Button>
      )
    })}
  </Div>
)

const Button = Component.grey4.pv10.ph25.bRad25.fs13.ml30.mono.div()

const Lines = ({}) => (
  <Div h100p flex flexColumn justifyBetween>
    {weekdays.map((day, i) => (
      <Div h100p flex alignCenter bb bGrey6>
        <Div fs30>{day}</Div>
      </Div>
    ))}
  </Div>
)

const Boxes = ({}) => <Div>Boxes</Div>
