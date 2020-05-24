import React from 'react'
import { Component, Div } from './lib/design.js'

export const Steps = ({ steps }) => (
  <Div mt45 fs35>
    {steps.map((step, i) => (
      <Step key={`step-${i}`} step={step} number={i + 1} />
    ))}
  </Div>
)

const Step = ({ step, number }) => (
  <Div flex alignBaseline mb25>
    <StepNumber>
      {number < 10 && '0'}
      {number}
    </StepNumber>
    {step}.
  </Div>
)

const StepNumber = Component.grey7.w35.mr40.textRight.w20.shrink0.div()
