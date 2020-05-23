import React, { useState, useEffect } from 'react'

import { Component, Div } from './lib/design.js'
import { Minus, Plus } from './Icons.js'

const TextInputStyle = Component.current.bgNone.pb15.bb.fs40.w100p.input()
export const TextInput = ({ name, required, data, setData, ...rest }) => (
  <Div w75p>
    <TextInputStyle
      onChange={(e) =>
        setData({
          ...data,
          [name]: e.target.value,
        })
      }
      type="text"
      name={name}
      id={`input-${name}`}
      {...rest}
    />
    {required && !data[name] && (
      <Warning id={`warning-${name}`}>Chop chop, I need some {name}</Warning>
    )}
  </Div>
)

const NumberInputStyle = Component.current.bgNone.textCenter.w200.fs100.input()
export const NumberInput = ({ name, current, data, setData, ...rest }) => {
  const [count, setCount] = useState(45)

  useEffect(() => {
    if (current.name !== name) return
    setData({ ...data, [name]: count })
  }, [current, count, name])

  return (
    <Counter>
      <Numero>
        <Minus onClick={() => setCount(count - 1)} pointer width={50} mr30 />
        <NumberInputStyle
          max="999"
          type="number"
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value))
          }}
          {...rest}
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

export const BulletInput = ({ name, current, data, setData, ...rest }) => {
  const [list, setList] = useState([{ ingredient: 'Salt', quantity: '1 cup' }])

  useEffect(() => {
    if (current.name !== name) return
    setData({ ...data, [name]: list })
  }, [current, list, name])

  return <TextInputStyle type="text" {...rest} />
}

export const ListInput = ({ name, current, data, setData, ...rest }) => {
  const [list, setList] = useState(['Step 1', 'Step 2', 'Step 3'])

  useEffect(() => {
    if (current.name !== name) return
    setData({ ...data, [name]: list })
  }, [current, list, name])

  return <TextInputStyle type="text" {...rest} />
}

const Warning = Component.fs15.lh20.mt15.textRight.div()

export const warn = (current) => {
  const warning = document.getElementById(`warning-${current.name}`)
  const input = document.getElementById(`input-${current.name}`)
  const targets = [warning, input]
  targets.forEach((e) => {
    e.classList.add('fade-red')
    setTimeout(() => {
      e.classList.remove('fade-red')
    }, 750)
  })
}
