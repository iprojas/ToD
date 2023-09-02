import { qs } from './utils'
import { TCanvas } from './webgl/TCanvas1970'

const canvas = new TCanvas(qs<HTMLDivElement>('.canvas-container'))

window.addEventListener('beforeunload', () => {
  canvas.dispose()
})
