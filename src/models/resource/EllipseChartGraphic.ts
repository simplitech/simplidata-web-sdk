import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'
import { ResponseSerialize } from '../../simpli'

export class EllipseChartGraphic implements ChartGraphic {
  $name = 'EllipseChartGraphic'
  $isDone = false
  $isCancelled = false

  @ResponseSerialize(ChartGraphicPosition)
  p1: ChartGraphicPosition | null = null

  @ResponseSerialize(ChartGraphicPosition)
  p2: ChartGraphicPosition | null = null

  cleanCopy() {
    return new EllipseChartGraphic()
  }

  get $isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  build(echart: echarts.ECharts) {
    if (!this.p1 || !this.p2) {
      return null
    }

    const p1Pos = this.p1.get(echart)
    const p2Pos = this.p2.get(echart)

    const r = Math.sqrt(Math.pow(p1Pos[0] - p2Pos[0], 2) + Math.pow(p1Pos[1] - p2Pos[1], 2))

    return {
      type: 'circle',
      position: p1Pos,
      z: 100,
      style: {
        stroke: '#ddd',
        fill: null,
      },
      shape: {
        cx: 0,
        cy: 0,
        r,
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

      return true // done editing
    }

    return false // edit is not done
  }
}
