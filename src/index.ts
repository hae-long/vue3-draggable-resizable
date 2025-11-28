import VueDraggableResizable from './components/Vue3DraggableResizable'
import DraggableContainer from './components/DraggableContainer'
import {
  convertToPixel,
  convertFromPixel,
  validatePercentage,
  validatePixel,
  generateRandomColor
} from './components/utils'
import type { App, Plugin } from 'vue'

const VueDraggableResizablePlugin: Plugin = {
  install(app: App) {
    app.component('Vue3DraggableResizable', VueDraggableResizable)
    app.component('DraggableContainer', DraggableContainer)
  }
}

// Components
export { DraggableContainer }
export { VueDraggableResizable }

// Unit conversion utilities
export {
  convertToPixel,
  convertFromPixel,
  validatePercentage,
  validatePixel,
  generateRandomColor
}

export default VueDraggableResizablePlugin
