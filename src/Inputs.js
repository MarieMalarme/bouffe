import React, { useState } from 'react'

import { Component, Div } from './lib/design.js'
import { Minus, Plus } from './Icons.js'

const TextInputStyle = Component.current.bgNone.pb15.bb.fs40.w75p.input()
export const TextInput = ({ name, ...props }) => {
  return <TextInputStyle type="text" name={name} {...props} />
}

const NumberInputStyle = Component.current.bgNone.textCenter.w200.fs100.input()
export const NumberInput = ({ name, ...props }) => {
  const [count, setCount] = useState(45)

  return (
    <Counter>
      <Numero>
        <Minus onClick={() => setCount(count - 1)} pointer width={50} mr30 />
        <NumberInputStyle
          max="999"
          value={count}
          type="number"
          onChange={(e) => {
            setCount(Number(e.target.value))
          }}
          {...props}
        />
        <Plus onClick={() => setCount(count + 1)} pointer width={50} ml20 />
      </Numero>
      <Div grey6 ml10>
        min
      </Div>
    </Counter>
  )
}

const Counter = Component.noSelect.w100p.flex.alignCenter.flexColumn.div()
const Numero = Component.flex.justifyCenter.div()
