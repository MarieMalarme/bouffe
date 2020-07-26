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
      value={data[name]}
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
  const time = name === 'time'
  const temp = name === 'temp'
  const serving = name === 'serving'

  const num =
    data.specs &&
    data.specs[name] &&
    String(data.specs[name]).replace(/[^0-9]/g, '')

  const defaultNum = (time && 45) || (temp && 180) || (serving && 4) || 10

  const [count, setCount] = useState(num || defaultNum)

  const symbol = (time && 'min') || (temp && '°') || ''
  const unit =
    (time && 'minutes') || (temp && 'degrees') || (serving && 'servings')

  useEffect(() => {
    if (current.name !== name) return
    setData({
      ...data,
      ['specs']: { ...data['specs'], [name]: `${count}${symbol}` },
    })
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
        {unit}
      </Div>
    </Counter>
  )
}

const Counter = Component.noSelect.w100p.flex.alignCenter.flexColumn.div()
const Numero = Component.flex.justifyCenter.div()

export const BulletsInput = ({ name, data, setData, required, type }) => {
  const existingData = data[name] && Object.values(data[name]).length
  const indexes = existingData && [...Array(existingData + 1).keys()].slice(1)

  const [reference, setReference] = useState(null)
  const [bullets, setBullets] = useState(indexes || [1])
  const [click, setClick] = useState(false)

  const key = name.slice(0, -1)

  useEffect(() => {
    if (bullets.length > 1) return
    const first = document.getElementById(`bullet-${name}-${bullets[0]}`)
    first && first.focus()
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
            data={data}
            name={name}
            remove={remove}
            update={update}
            bullets={bullets}
            setBullets={setBullets}
            setClick={setClick}
            type={type}
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
          item={key}
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

const Bullet = ({ data, name, remove, update, bullets, setClick, type, i }) => {
  const single = bullets.length === 1
  const numbers = type === 'numbers'
  const index = bullets.indexOf(i)

  const isIngredient = name === 'ingredients'
  const hasData = data[name] && data[name][index]
  const elem = hasData && ((isIngredient && hasData.ingredient) || hasData.step)

  return (
    <Div flex alignCenter mb25 w45p={!numbers} w100p={numbers}>
      <Lister numbers={numbers} index={index + 1} />
      <TextInputStyle
        autoFocus
        type="text"
        name={name}
        defaultValue={elem}
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

const Lister = ({ numbers, index }) => {
  if (!numbers) return <Dot />
  return (
    <Int>
      {index < 10 && '0'}
      {index}
    </Int>
  )
}

const Int = Component.grey7.fs40.w35.mr40.div()
const Dot = Component.w10.h10.bRad50p.shrink0.bgBlack.mr40.div()

const Add = ({ bullets, setBullets, click, setClick, reference, item }) => (
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
    Add {item}
  </Button>
)

const Button = Component.flex.alignCenter.fs40.grey3.animOpacity.zi2.div()

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
