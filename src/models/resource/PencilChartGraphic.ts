import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class PencilChartGraphic implements ChartGraphic {
  $name = 'PencilChartGraphic'
  points: ChartGraphicPosition[] = []
  echart: echarts.ECharts | null = null

  cleanCopy() {
    return new PencilChartGraphic()
  }

  build(echart: echarts.ECharts) {
    this.echart = echart

    if (!this.points.length) {
      return null
    }

    const p1Pos = this.points[0].get(this.echart)

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

  mousedown(x: number, y: number) {
    if (this.echart) {
      const p = new ChartGraphicPosition()
      p.set(this.echart, x, y)
      this.points.push(p)
    }
  }

  mousemove(x: number, y: number) {
    if (this.echart && this.points.length) {
      const p = new ChartGraphicPosition()
      p.set(this.echart, x, y)
      this.points.push(p)

      return true // mousemove is relevant
    }

    return false // mousemove is irrelevant
  }

  mouseup(x: number, y: number) {
    return true
  }
}
