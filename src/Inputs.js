import React, { useState } from 'react'

import { Component, Div } from './lib/design.js'
import { Minus, Plus } from './Icons.js'

const TextInputStyle = Component.current.bgNone.pb15.bb.fs40.w100p.input()
export const TextInput = ({ name, required = false, ...props }) => {
  const [value, setValue] = useState('')
  return (
    <Div w75p>
      <TextInputStyle
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        name={name}
        {...props}
      />
      {required && !value && <Warning>Chop chop, I need some {name}</Warning>}
    </Div>
  )
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

const Warning = Component.fs15.lh20.mt15.textRight.div()
