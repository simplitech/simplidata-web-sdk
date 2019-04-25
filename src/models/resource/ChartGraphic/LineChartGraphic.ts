import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class LineChartGraphic extends ChartGraphic {
  name = 'LineChartGraphic'

  @ResponseSerialize(ChartGraphicPosition)
  p1: ChartGraphicPosition | null

  @ResponseSerialize(ChartGraphicPosition)
  p2: ChartGraphicPosition | null

  constructor(
    p1: ChartGraphicPosition | null = null,
    p2: ChartGraphicPosition | null = null,
    isDone: boolean = false,
    color: string = '#dddddd'
  ) {
    super(isDone, color)
    this.p1 = p1
    this.p2 = p2
  }

  cleanCopy() {
    const copy = new LineChartGraphic()
    copy.color = this.color
    return copy
  }

  clone(): ChartGraphic {
    return new LineChartGraphic(
      this.p1 ? this.p1.clone() : null,
      this.p2 ? this.p2.clone() : null,
      this.isDone,
      this.color
    )
  }

  get isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  build(echart: echarts.ECharts, allowInteraction: boolean) {
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
      draggable: allowInteraction,
      ondragstart: (e: any) => ChartBus.$emit('graphicDragStart', [e.offsetX, e.offsetY]),
      ondragend: (e: any) => ChartBus.$emit('graphicDragEnd', { graphic: this, pos: [e.offsetX, e.offsetY] }),
      onclick: () => ChartBus.$emit('graphicSelect', this),
    }
  }

  offsetPosition(echart: echarts.ECharts, x: number, y: number) {
    if (this.p1) {
      this.p1.increaseBy(echart, x, y)
    }
    if (this.p2) {
      this.p2.increaseBy(echart, x, y)
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
