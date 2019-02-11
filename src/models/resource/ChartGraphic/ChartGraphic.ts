import echarts from 'echarts'

export abstract class ChartGraphic {
  abstract $name: string
  abstract $isValidToSave: boolean
  abstract build(echart: echarts.ECharts, colors: string[] | null): any
  abstract mousedown(echart: echarts.ECharts, x: number, y: number): void
  abstract mousemove(echart: echarts.ECharts, x: number, y: number): boolean
  abstract mouseup(echart: echarts.ECharts, x: number, y: number): boolean
  abstract cleanCopy(): ChartGraphic

  private isDone = false
  private isCancelled = false

  get $isDone() {
    return this.isDone
  }

  set $isDone(val) {
    if (this.$isValidToSave) {
      this.isDone = val
    }
  }

  get $isCancelled() {
    return this.isCancelled
  }

  set $isCancelled(val) {
    this.isCancelled = val
  }
}
