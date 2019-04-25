import echarts from 'echarts'

export class ChartGraphicPosition {
  axisX: number
  axisY: number
  offsetX: number
  offsetY: number

  constructor(axisX: number = 0, axisY: number = 0, offsetX: number = 0, offsetY: number = 0) {
    this.axisX = axisX
    this.axisY = axisY
    this.offsetX = offsetX
    this.offsetY = offsetY
  }

  set(echart: echarts.ECharts, x: number, y: number) {
    this.axisX = Number(echart.convertFromPixel('xAxis', `${x}`))
    this.axisY = Number(echart.convertFromPixel('yAxis', `${y}`))

    const [xAx, yAx] = echart.convertToPixel({ seriesIndex: 0 }, [this.axisX, this.axisY]) as any[]

    this.offsetX = x - xAx
    this.offsetY = y - yAx
  }

  get(echart: echarts.ECharts): number[] {
    const pixels = echart.convertToPixel({ seriesIndex: 0 }, [this.axisX, this.axisY]) as any[] | null

    if (pixels) {
      return [pixels[0] + this.offsetX, pixels[1] + this.offsetY]
    } else {
      return [0, 0]
    }
  }

  increaseBy(echart: echarts.ECharts, x2: number, y2: number) {
    const [x1, y1] = this.get(echart)
    this.set(echart, x1 + x2, y1 + y2)
  }

  clone() {
    return new ChartGraphicPosition(this.axisX, this.axisY, this.offsetX, this.offsetY)
  }
}
