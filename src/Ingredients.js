import React, { useState } from 'react'
import { Component, Div, Span } from './lib/design.js'

export const Ingredients = ({ ingredients }) => (
  <Div pt70 flex flexWrap>
    {ingredients.map(({ ingredient, quantity }, i) => (
      <Ingredient
        key={`${ingredient}`}
        ingredient={ingredient}
        quantity={quantity}
      />
    ))}
  </Div>
)

const Ingredient = ({ ingredient, quantity }) => {
  const [checked, setChecked] = useState(false)
  return (
    <CheckIngredient
      className="ingredient"
      onClick={() => setChecked(!checked)}
    >
      <Checkbox>
        <CheckDot className={!checked ? 'check-dot' : ''} o100={checked} />
      </Checkbox>
      {ingredient}
      <Span ml10 grey5 italic>
        {quantity}
      </Span>
    </CheckIngredient>
  )
}

const CheckIngredient = Component.w25p.pr15.flex.alignCenter.mb25.pointer.div()
const Checkbox = Component.mr20.bRad50p.w25.h25.fs12.flex.alignCenter.justifyCenter.bgGrey9.shadowIn.div()
const CheckDot = Component.bRad50p.w5.h5.bgGrey2.animOpacity.o0.div()
