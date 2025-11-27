import { Ref } from 'vue'
import { initParent } from './hooks'

export interface Position {
  x: number
  y: number
  w: number
  h: number
}

// 단위 타입 추가
export type Unit = 'px' | '%'

// 단위를 포함한 값 타입
export interface ValueWithUnit {
  value: number
  unit: Unit
}

// 단위를 포함한 Position 타입
export interface PositionWithUnit {
  x: ValueWithUnit
  y: ValueWithUnit
  w: ValueWithUnit
  h: ValueWithUnit
}

export interface PositionStore {
  [propName: string]: Position
}

export type UpdatePosition = (id: string, position: Position) => void

export type GetPositionStore = (excludeId?: string) => PositionStore

export interface ContainerProvider {
  updatePosition: UpdatePosition
  getPositionStore: GetPositionStore
  setMatchedLine: SetMatchedLine
  disabled: Ref<boolean>
  adsorbParent: Ref<boolean>
  adsorbCols: number[]
  adsorbRows: number[]
}

export interface MatchedLine {
  row: number[]
  col: number[]
}
export type SetMatchedLine = (matchedLine: MatchedLine | null) => void

export type ResizingHandle =
  | 'tl'
  | 'tm'
  | 'tr'
  | 'ml'
  | 'mr'
  | 'bl'
  | 'bm'
  | 'br'
  | ''

export type ParentSize = ReturnType<typeof initParent>

export type ReferenceLineMap = Record<
  'col' | 'row',
  {
    [propName: number]: Record<'min' | 'max' | 'value', number>
  }
>
