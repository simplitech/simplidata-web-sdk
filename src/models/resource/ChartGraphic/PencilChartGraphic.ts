import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class PencilChartGraphic extends ChartGraphic {
  name = 'PencilChartGraphic'

  @ResponseSerialize(ChartGraphicPosition)
  points: ChartGraphicPosition[] = []

  cleanCopy() {
    const copy = new PencilChartGraphic()
    copy.color = this.color
    return copy
  }

  get isValidToSave() {
    return this.points.length > 0
  }

  build(echart: echarts.ECharts) {
    if (!this.isValidToSave) {
      return null
    }

    const p1Pos = this.points[0].get(echart)

    return {
      type: 'polyline',
      position: p1Pos,
      z: 100,
      style: {
        stroke: this.color,
      },
      shape: {
        smooth: 'spline',
        points: this.points.map(p => {
          const pos = p.get(echart)
          return [pos[0] - p1Pos[0], pos[1] - p1Pos[1]]
        }),
      },
      onclick: () => {
        ChartBus.$emit('graphicSelect', this)
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
    ChartBus.$emit('doneDrawing')
  }
}
