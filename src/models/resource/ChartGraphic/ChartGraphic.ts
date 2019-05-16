import echarts from 'echarts'

export abstract class ChartGraphic {
  abstract name: string
  abstract isValidToSave: boolean
  abstract build(echart: echarts.ECharts, allowInteraction: boolean, colors: string[] | null): any
  abstract mousedown(echart: echarts.ECharts, x: number, y: number): void
  abstract mousemove(echart: echarts.ECharts, x: number, y: number): boolean
  abstract mouseup(echart: echarts.ECharts, x: number, y: number): void
  abstract cleanCopy(): ChartGraphic
  abstract clone(): ChartGraphic
  abstract offsetPosition(echart: echarts.ECharts, x: number, y: number): void

  isDone: boolean
  color: string

  constructor(isDone: boolean = false, color: string = '#dddddd') {
    this.isDone = isDone
    this.color = color
  }

  mouseleave(echart: echarts.ECharts, x: number, y: number) {
    this.mouseup(echart, x, y)
  }
}
