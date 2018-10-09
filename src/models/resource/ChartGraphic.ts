import echarts from 'echarts'

export class ChartGraphic {
  axisX = 0
  axisY = 0
  offsetX = 0
  offsetY = 0
  type?: string

  setPosition(echart: echarts.ECharts, x: number, y: number) {
    this.axisX = Number(echart.convertFromPixel('xAxis', `${x}`))
    this.axisY = Number(echart.convertFromPixel('yAxis', `${y}`))

    this.offsetX = x - Number(echart.convertToPixel('xAxis', `${this.axisX}`))
    this.offsetY = y - Number(echart.convertToPixel('yAxis', `${this.axisY}`))
  }

  getPosition(echart: echarts.ECharts): number[] {
    return [
      Number(echart.convertToPixel('xAxis', `${this.axisX}`)) + this.offsetX,
      Number(echart.convertToPixel('yAxis', `${this.axisY}`)) + this.offsetY,
    ]
  }
}
