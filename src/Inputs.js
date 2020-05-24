import React, { useState, useEffect } from 'react'

import { Component, Div } from './lib/design.js'
import { Minus, Plus } from './Icons.js'

const TextInputStyle = Component.current.bgNone.fs40.w100p.input()
export const TextInput = ({ name, required, data, setData, ...rest }) => (
  <Div w75p>
    <TextInputStyle
      placeholder={`Gimme some ${name}`}
      onChange={(e) =>
        setData({
          ...data,
          [name]: e.target.value,
        })
      }
      type="text"
      name={name}
      id={`input-${name}`}
      pb15
      bb
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

export const BulletsInput = ({ name, current, data, setData, required }) => {
  const [reference, setReference] = useState(null)
  const [bullets, setBullets] = useState([0])
  const [click, setClick] = useState(false)

  const key = name.slice(0, -1)

  useEffect(() => {
    if (bullets.length > 1) return
    const first = document.getElementById(`bullet-${name}-${bullets[0]}`)
    first.focus()
  })

  const none = !data[name] || (data[name] && data[name].every((d) => !d[key]))

  const remove = (i) => {
    setBullets(bullets.filter((a) => a !== i))
    setData({
      ...data,
      [name]: data[name].filter((d) => d[key]),
    })
  }

  const update = (e, i) => {
    const item = { id: i, [key]: e.target.value }
    const updated = data[name] && [
      ...data[name].filter((d) => d.id !== i),
      item,
    ]
    setData({
      ...data,
      [name]: updated || [item],
    })
  }

  return (
    <Div flex flexColumn justifyFlexEnd h100p>
      <Bullets className="bullets" elemRef={setReference}>
        {bullets.map((i) => (
          <Bullet
            key={`bullet-${name}-${i}`}
            name={name}
            remove={remove}
            update={update}
            bullets={bullets}
            setBullets={setBullets}
            setClick={setClick}
            i={i}
          />
        ))}
      </Bullets>
      <Div flex alignCenter justifyBetween>
        <Add
          bullets={bullets}
          setBullets={setBullets}
          click={click}
          setClick={setClick}
          reference={reference}
        />
        {required && none && (
          <Warning id={`warning-${name}`}>
            Chop chop, I need some {name}
          </Warning>
        )}
      </Div>
    </Div>
  )
}

const Bullets = Component.absolute.flex.flexWrap.justifyBetween.alignFlexStart.w100p.noScrollbar.t0.ofScroll.div()

const Bullet = ({ name, remove, update, bullets, setClick, i }) => {
  const single = bullets.length === 1
  return (
    <Div flex alignCenter w45p mb25>
      <Dot />
      <TextInputStyle
        autoFocus
        type="text"
        name={name}
        id={`bullet-${name}-${i}`}
        placeholder={`Gimme some${single ? 'thing' : ' more'}`}
        onChange={(e) => {
          update(e, i)
          setClick(e.target.value)
        }}
        onBlur={(e) => {
          if (single) return
          if (!e.target.value) {
            remove(i)
            setClick(true)
          }
        }}
      />
    </Div>
  )
}

const Dot = Component.w10.h10.bRad50p.shrink0.bgBlack.mr40.div()

const Add = ({ bullets, setBullets, click, setClick, reference }) => (
  <Button
    o10={!click}
    o100={click}
    pointer={click}
    onClick={async () => {
      if (!click) return
      setClick(false)
      await setBullets([...bullets, bullets[bullets.length - 1] + 1])
      reference.scrollTo({
        top: reference.scrollHeight,
        behavior: 'smooth',
      })
    }}
  >
    <Plus mr20 width={40} strokeWidth={4} />
    Add ingredient
  </Button>
)

const Button = Component.flex.alignCenter.fs40.grey3.animOpacity.zi2.div()

export const ListInput = ({ name, current, data, setData, required }) => {
  const [list, setList] = useState(['Step 1', 'Step 2', 'Step 3'])

  useEffect(() => {
    if (current.name !== name) return
    setData({ ...data, [name]: list })
  }, [current, list, name])

  return <TextInputStyle pb15 bb type="text" />
}

const Warning = Component.fs15.lh20.mt15.textRight.div()

export const warn = (current) => {
  const warning = document.getElementById(`warning-${current.name}`)
  const input = document.activeElement
  const targets = [warning, input]
  targets.forEach((target) => {
    if (!target) return
    target.classList.add('fade-red')
    setTimeout(() => {
      target.classList.remove('fade-red')
    }, 750)
  })
}
