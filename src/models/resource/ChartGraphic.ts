import echarts from 'echarts'

export interface ChartGraphic {
  $name: string
  $isValidToSave: boolean
  $isDone: boolean
  $isCancelled: boolean
  build(echart: echarts.ECharts, colors: string[] | null): any
  mousedown(echart: echarts.ECharts, x: number, y: number): void
  mousemove(echart: echarts.ECharts, x: number, y: number): boolean
  mouseup(echart: echarts.ECharts, x: number, y: number): boolean
  cleanCopy(): ChartGraphic
}
