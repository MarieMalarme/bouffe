import { wrapper } from 'dallas'
import { flags } from './style.js'

export const Component = wrapper({ ...flags, consume: true })

export const Div = Component.div()
export const Span = Component.span()
export const Code = Component.white.mono.wsPre.code()
export const FixedContainer = Component.flex.flexColumn.w100vw.h100vh.fixed.bgGrey9.t0.l0.animOpacity.pa100.fs60.div()
