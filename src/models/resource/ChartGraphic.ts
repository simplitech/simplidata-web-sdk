import echarts from 'echarts'

export interface ChartGraphic {
  $name: string
  $isValidToSave: boolean
  build(echart: echarts.ECharts): any
  mousedown(x: number, y: number): void
  mousemove(x: number, y: number): boolean
  mouseup(x: number, y: number): boolean
  cleanCopy(): ChartGraphic
}
