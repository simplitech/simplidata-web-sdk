import echarts from 'echarts'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class ChartGraphicPositionWithData extends ChartGraphicPosition {
  date: string | null = null
  values: number[] = []

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
}
