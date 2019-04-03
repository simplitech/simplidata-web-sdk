import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class LineChartGraphic extends ChartGraphic {
  name = 'LineChartGraphic'

  @ResponseSerialize(ChartGraphicPosition)
  p1: ChartGraphicPosition | null = null

  @ResponseSerialize(ChartGraphicPosition)
  p2: ChartGraphicPosition | null = null

  cleanCopy() {
    const copy = new LineChartGraphic()
    copy.color = this.color
    return copy
  }

  get isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  build(echart: echarts.ECharts) {
    if (!this.p1 || !this.p2) {
      return null
    }

    const p1Pos = this.p1.get(echart)
    const p2Pos = this.p2.get(echart)

    return {
      type: 'line',
      position: p1Pos,
      z: 100,
      style: {
        stroke: this.color,
      },
      shape: {
        x1: 0,
        y1: 0,
        x2: p2Pos[0] - p1Pos[0],
        y2: p2Pos[1] - p1Pos[1],
      },
      onclick: () => {
        ChartBus.$emit('graphicSelect', this)
      },
    }
  }

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    if (!this.p1) {
      this.p1 = new ChartGraphicPosition()
    }

    this.p1.set(echart, x, y)
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    if (this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPosition()
      }

      this.p2.set(echart, x, y)
      return true // mousemove is relevant
    }

    return false // mousemove is irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPosition()
      }

      this.p2.set(echart, x, y)
      ChartBus.$emit('doneDrawing')
    }
  }
}
