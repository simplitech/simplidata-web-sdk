import echarts from 'echarts'

export abstract class ChartGraphic {
  abstract name: string
  abstract isValidToSave: boolean
  abstract build(echart: echarts.ECharts, colors: string[] | null): any
  abstract mousedown(echart: echarts.ECharts, x: number, y: number): void
  abstract mousemove(echart: echarts.ECharts, x: number, y: number): boolean
  abstract mouseup(echart: echarts.ECharts, x: number, y: number): void
  abstract cleanCopy(): ChartGraphic

  private _isDone = false
  private _isCancelled = false

  color = '#dddddd'

  get isDone() {
    return this._isDone
  }

  set isDone(val) {
    if (this.isValidToSave) {
      this._isDone = val
    }
  }

  get isCancelled() {
    return this._isCancelled
  }

  set isCancelled(val) {
    this._isCancelled = val
  }
}
