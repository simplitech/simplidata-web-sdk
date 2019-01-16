import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class LineChartGraphic implements ChartGraphic {
  $name = 'LineChartGraphic'
  p1: ChartGraphicPosition | null = null
  p2: ChartGraphicPosition | null = null
  echart: echarts.ECharts | null = null

  cleanCopy() {
    return new LineChartGraphic()
  }

  get $isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  build(echart: echarts.ECharts) {
    this.echart = echart

    if (!this.p1 || !this.p2) {
      return null
    }

    const p1Pos = this.p1.get(this.echart)
    const p2Pos = this.p2.get(this.echart)

    return {
      type: 'line',
      position: p1Pos,
      z: 100,
      style: {
        stroke: '#ddd',
      },
      shape: {
        x1: 0,
        y1: 0,
        x2: p2Pos[0] - p1Pos[0],
        y2: p2Pos[1] - p1Pos[1],
      },
    }
  }

  mousedown(x: number, y: number) {
    if (this.echart) {
      if (!this.p1) {
        this.p1 = new ChartGraphicPosition()
      }

      this.p1.set(this.echart, x, y)
    }
  }

  mousemove(x: number, y: number) {
    if (this.echart && this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPosition()
      }

      this.p2.set(this.echart, x, y)

      return true // mousemove is relevant
    }

    return false // mousemove is irrelevant
  }

  mouseup(x: number, y: number) {
    if (this.echart && this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPosition()
      }

      this.p2.set(this.echart, x, y)

      return true // done editing
    }

    return false // edit is not done
  }
}
