import {
  ContainerProvider,
  ParentSize,
  ReferenceLineMap,
  ResizingHandle
} from './types'
import { ALL_HANDLES } from './Vue3DraggableResizable'

export const IDENTITY = Symbol('Vue3DraggableResizable')

export function getElSize(el: Element) {
  const style = window.getComputedStyle(el)
  return {
    width: parseFloat(style.getPropertyValue('width')),
    height: parseFloat(style.getPropertyValue('height'))
  }
}

function createEventListenerFunction(
  type: 'addEventListener' | 'removeEventListener'
) {
  return <K extends keyof HTMLElementEventMap>(
    el: HTMLElement,
    events: K | K[],
    handler: any
  ) => {
    if (!el) {
      return
    }
    if (typeof events === 'string') {
      events = [events]
    }
    events.forEach((e) => el[type](e, handler, { passive: false }))
  }
}

export const addEvent = createEventListenerFunction('addEventListener')

export const removeEvent = createEventListenerFunction('removeEventListener')

export function filterHandles(handles: ResizingHandle[]) {
  if (handles && handles.length > 0) {
    const result: ResizingHandle[] = []
    handles.forEach((item) => {
      if (ALL_HANDLES.includes(item) && !result.includes(item)) {
        result.push(item)
      }
    })
    return result
  } else {
    return []
  }
}

export function getId() {
  return String(Math.random()).substr(2) + String(Date.now())
}

// Unit conversion functions
/**
 * Converts a value to pixels based on the unit type
 * @param value - The numeric value to convert
 * @param unit - The unit type ('px' or '%')
 * @param parentSize - The parent element size in pixels
 * @returns The value converted to pixels
 * @throws Error if value or parentSize is negative
 */
export function convertToPixel(value: number, unit: string, parentSize: number): number {
  if (value < 0) {
    throw new Error('Value cannot be negative')
  }
  if (parentSize < 0) {
    throw new Error('Parent size cannot be negative')
  }

  if (unit === '%') {
    return (value / 100) * parentSize
  }
  return value
}

/**
 * Converts a pixel value to the specified unit type
 * @param value - The pixel value to convert
 * @param unit - The target unit type ('px' or '%')
 * @param parentSize - The parent element size in pixels
 * @returns The value converted to the target unit (with 2 decimal precision for %)
 * @throws Error if value or parentSize is negative, or parentSize is zero when converting to %
 */
export function convertFromPixel(value: number, unit: string, parentSize: number): number {
  if (value < 0) {
    throw new Error('Value cannot be negative')
  }
  if (parentSize < 0) {
    throw new Error('Parent size cannot be negative')
  }

  if (unit === '%') {
    // Return 0 if parent size is not yet calculated (during initialization)
    if (parentSize === 0) {
      return 0
    }
    const percentValue = (value / parentSize) * 100
    return Number(percentValue.toFixed(2))  // Limit to 2 decimal places
  }
  return value
}

// Unit conversion validation functions
/**
 * Validates if a percentage value is within valid range (0-100)
 * @param value - The percentage value to validate
 * @returns true if value is between 0 and 100 (inclusive), false otherwise
 */
export function validatePercentage(value: number): boolean {
  return value >= 0 && value <= 100
}

/**
 * Validates if a pixel value is within parent bounds
 * @param value - The pixel value to validate
 * @param parentSize - The parent element size in pixels
 * @returns true if value is between 0 and parentSize (inclusive), false otherwise
 * @throws Error if parentSize is negative
 */
export function validatePixel(value: number, parentSize: number): boolean {
  if (parentSize < 0) {
    throw new Error('Parent size cannot be negative')
  }
  return value >= 0 && value <= parentSize
}

// Random color generation
/**
 * Generates a random hex color string
 * @returns A random color in hex format (e.g., '#3A7FE1')
 */
export function generateRandomColor(): string {
  const randomInt = Math.floor(Math.random() * 0xFFFFFF)
  return '#' + randomInt.toString(16).padStart(6, '0').toUpperCase()
}

// Rotation utility functions
/**
 * Convert degrees to radians
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * Rotate a point around a center point
 */
export function rotatePoint(
  px: number,
  py: number,
  cx: number,
  cy: number,
  angleDeg: number
): { x: number; y: number } {
  const angleRad = degToRad(angleDeg)
  const cos = Math.cos(angleRad)
  const sin = Math.sin(angleRad)
  const dx = px - cx
  const dy = py - cy
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos
  }
}

/**
 * Get the cursor type based on handle position and rotation angle
 * Returns the appropriate cursor for the rotated handle
 */
export function getRotatedCursor(handle: ResizingHandle, rotation: number): string {
  // Base cursor angles for each handle (when rotation is 0)
  const baseCursors: Record<string, number> = {
    'tl': -135,  // nw-resize
    'tm': -90,   // n-resize
    'tr': -45,   // ne-resize
    'mr': 0,     // e-resize
    'br': 45,    // se-resize
    'bm': 90,    // s-resize
    'bl': 135,   // sw-resize
    'ml': 180    // w-resize
  }

  // Cursor types in clockwise order
  const cursorTypes = [
    'e-resize',   // 0
    'se-resize',  // 45
    's-resize',   // 90
    'sw-resize',  // 135
    'w-resize',   // 180
    'nw-resize',  // 225 (-135)
    'n-resize',   // 270 (-90)
    'ne-resize'   // 315 (-45)
  ]

  if (!handle || baseCursors[handle] === undefined) return 'default'

  // Calculate the effective angle
  let angle = baseCursors[handle] + rotation
  // Normalize to 0-360
  angle = ((angle % 360) + 360) % 360

  // Map angle to cursor index (each cursor covers 45 degrees)
  const index = Math.round(angle / 45) % 8

  return cursorTypes[index]
}

/**
 * Transform mouse delta based on rotation angle
 * This converts screen-space mouse movement to element-local movement
 */
export function transformDelta(
  deltaX: number,
  deltaY: number,
  rotation: number
): { dx: number; dy: number } {
  const angleRad = degToRad(-rotation) // Negative to transform from screen to local
  const cos = Math.cos(angleRad)
  const sin = Math.sin(angleRad)
  return {
    dx: deltaX * cos - deltaY * sin,
    dy: deltaX * sin + deltaY * cos
  }
}

/**
 * Calculate the bounding box of a rotated rectangle
 * Returns the axis-aligned bounding box that contains the rotated rectangle
 */
export function getRotatedBoundingBox(
  x: number,
  y: number,
  w: number,
  h: number,
  rotation: number
): { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number } {
  const cx = x + w / 2
  const cy = y + h / 2

  // Four corners of the rectangle
  const corners = [
    { x: x, y: y },         // top-left
    { x: x + w, y: y },     // top-right
    { x: x + w, y: y + h }, // bottom-right
    { x: x, y: y + h }      // bottom-left
  ]

  // Rotate all corners
  const rotatedCorners = corners.map(corner =>
    rotatePoint(corner.x, corner.y, cx, cy, rotation)
  )

  // Find bounding box
  const xs = rotatedCorners.map(c => c.x)
  const ys = rotatedCorners.map(c => c.y)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  }
}

export function getReferenceLineMap(
  containerProvider: ContainerProvider,
  parentSize: ParentSize,
  id?: string
) {
  if (containerProvider.disabled.value) {
    return null
  }
  const referenceLine = {
    row: [] as number[],
    col: [] as number[]
  }
  const { parentWidth, parentHeight } = parentSize
  referenceLine.row.push(...containerProvider.adsorbRows)
  referenceLine.col.push(...containerProvider.adsorbCols)
  if (containerProvider.adsorbParent.value) {
    referenceLine.row.push(0, parentHeight.value, parentHeight.value / 2)
    referenceLine.col.push(0, parentWidth.value, parentWidth.value / 2)
  }
  const widgetPositionStore = containerProvider.getPositionStore(id)
  Object.values(widgetPositionStore).forEach(({ x, y, w, h }) => {
    referenceLine.row.push(y, y + h, y + h / 2)
    referenceLine.col.push(x, x + w, x + w / 2)
  })
  const referenceLineMap: ReferenceLineMap = {
    row: referenceLine.row.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } }
    }, {}),
    col: referenceLine.col.reduce((pre, cur) => {
      return { ...pre, [cur]: { min: cur - 5, max: cur + 5, value: cur } }
    }, {})
  }
  return referenceLineMap
}
