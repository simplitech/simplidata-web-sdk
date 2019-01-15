import echarts from 'echarts'

export class ChartGraphicPosition {
  axisX = 0
  axisY = 0
  offsetX = 0
  offsetY = 0

  set(echart: echarts.ECharts, x: number, y: number) {
    this.axisX = Number(echart.convertFromPixel('xAxis', `${x}`))
    this.axisY = Number(echart.convertFromPixel('yAxis', `${y}`))

    const [xAx, yAx] = echart.convertToPixel({ seriesIndex: 0 }, [this.axisX, this.axisY]) as any[]

    this.offsetX = x - xAx
    this.offsetY = y - yAx
  }

  get(echart: echarts.ECharts): number[] {
    const [xAx, yAx] = echart.convertToPixel({ seriesIndex: 0 }, [this.axisX, this.axisY]) as any[]

    return [xAx + this.offsetX, yAx + this.offsetY]
  }
}
