import React, { Fragment, useState } from 'react'

import { Div } from './lib/design.js'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const Agenda = ({}) => {
  return (
    <Div pa100 h100vh flex flexColumn>
      <Div heading fs60 mb40>
        Agenda
      </Div>
      <Div h100p flex flexColumn justifyBetween>
        {weekdays.map((day, i) => (
          <Div h100p flex alignCenter bb bGrey6>
            <Div fs30>{day}</Div>
          </Div>
        ))}
      </Div>
    </Div>
  )
}
