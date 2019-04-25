import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class PencilChartGraphic extends ChartGraphic {
  name = 'PencilChartGraphic'

  @ResponseSerialize(ChartGraphicPosition)
  points: ChartGraphicPosition[]

  constructor(points: ChartGraphicPosition[] = [], isDone: boolean = false, color: string = '#dddddd') {
    super(isDone, color)
    this.points = points
  }

  cleanCopy() {
    const copy = new PencilChartGraphic()
    copy.color = this.color
    return copy
  }

  clone(): ChartGraphic {
    return new PencilChartGraphic(this.points.map(p => p.clone()), this.isDone, this.color)
  }

  get isValidToSave() {
    return this.points.length > 0
  }

  build(echart: echarts.ECharts, allowInteraction: boolean) {
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
      draggable: allowInteraction,
      ondragstart: (e: any) => ChartBus.$emit('graphicDragStart', [e.offsetX, e.offsetY]),
      ondragend: (e: any) => ChartBus.$emit('graphicDragEnd', { graphic: this, pos: [e.offsetX, e.offsetY] }),
      onclick: () => ChartBus.$emit('graphicSelect', this),
    }
  }

  offsetPosition(echart: echarts.ECharts, x: number, y: number) {
    this.points.forEach(p => {
      p.increaseBy(echart, x, y)
    })
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
