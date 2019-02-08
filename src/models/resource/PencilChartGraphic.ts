import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'
import { ResponseSerialize } from '../../simpli'

export class PencilChartGraphic implements ChartGraphic {
  $name = 'PencilChartGraphic'
  $isDone = false
  $isCancelled = false

  @ResponseSerialize(ChartGraphicPosition)
  points: ChartGraphicPosition[] = []

  cleanCopy() {
    return new PencilChartGraphic()
  }

  get $isValidToSave() {
    return this.points.length > 0
  }

  build(echart: echarts.ECharts) {
    if (!this.$isValidToSave) {
      return null
    }

    const p1Pos = this.points[0].get(echart)

    return {
      type: 'polyline',
      position: p1Pos,
      z: 100,
      style: {
        stroke: '#ddd',
      },
      shape: {
        smooth: 'spline',
        points: this.points.map(p => {
          const pos = p.get(echart)
          return [pos[0] - p1Pos[0], pos[1] - p1Pos[1]]
        }),
      },
    }
  }

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    const p = new ChartGraphicPosition()
    p.set(echart, x, y)
    this.points.push(p)
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    if (this.points.length) {
      const p = new ChartGraphicPosition()
      p.set(echart, x, y)
      this.points.push(p)

      return true // mousemove is relevant
    }

    return false // mousemove is irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    return true
  }
}
