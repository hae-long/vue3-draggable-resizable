import VueDraggableResizable from './components/Vue3DraggableResizable'
import DraggableContainer from './components/DraggableContainer'
import type { App, Plugin } from 'vue'

const VueDraggableResizablePlugin: Plugin = {
  install(app: App) {
    app.component('Vue3DraggableResizable', VueDraggableResizable)
    app.component('DraggableContainer', DraggableContainer)
  }
}

export { DraggableContainer }
export { VueDraggableResizable }
export default VueDraggableResizablePlugin
