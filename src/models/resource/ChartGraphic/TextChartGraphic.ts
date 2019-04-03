import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class TextChartGraphic extends ChartGraphic {
  name = 'TextChartGraphic'
  fontSize = 16

  @ResponseSerialize(ChartGraphicPosition)
  position: ChartGraphicPosition | null = null

  text = ''

  cleanCopy(): ChartGraphic {
    const copy = new TextChartGraphic()
    copy.color = this.color
    copy.fontSize = this.fontSize
    return copy
  }

  get isValidToSave() {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts): any {
    if (!this.position || !this.text.length) {
      return null
    }

    const pos = this.position.get(echart)

    return {
      ignore: !this.isDone, // is shown only before edit
      type: 'text',
      position: pos,
      z: 100,
      style: {
        text: this.text,
        fill: this.color,
        font: `${this.fontSize}px CircularStd`,
      },
      onclick: () => {
        ChartBus.$emit('graphicSelect', this)
      },
    }
  }

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    // nothing
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    return false // mousemove is always irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (this.isValidToSave) {
      ChartBus.$emit('doneDrawing')
    } else if (!this.position) {
      this.position = new ChartGraphicPosition()
      this.position.set(echart, x, y)
    } else {
      ChartBus.$emit('cancelDrawing')
    }
  }
}
