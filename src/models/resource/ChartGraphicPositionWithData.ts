import echarts from 'echarts'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class ChartGraphicPositionWithData extends ChartGraphicPosition {
  date: string | null
  values: number[]

  constructor(
    axisX: number = 0,
    axisY: number = 0,
    offsetX: number = 0,
    offsetY: number = 0,
    date: string | null = null,
    values: number[] = []
  ) {
    super(axisX, axisY, offsetX, offsetY)
    this.date = date
    this.values = values
  }

  set(echart: echarts.ECharts, x: number, y: number) {
    super.set(echart, x, y)

    const option: any = echart.getOption()

    if (!option && option.dataset) {
      return
    }

    const [date, ...values] = option.dataset[0].source[this.axisX]

    this.date = date
    this.values = values
  }

  clone(): ChartGraphicPositionWithData {
    return new ChartGraphicPositionWithData(this.axisX, this.axisY, this.offsetX, this.offsetY, this.date, [
      ...this.values,
    ])
  }
}
