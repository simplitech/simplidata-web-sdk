import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class TextChartGraphic implements ChartGraphic {
  $name = 'TextChartGraphic'
  position: ChartGraphicPosition | null = null
  text = ''
  echart: echarts.ECharts | null = null

  cleanCopy() {
    return new TextChartGraphic()
  }

  get $isValidToSave() {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts) {
    this.echart = echart

    if (!this.position || !this.text.length) {
      return null
    }

    const pos = this.position.get(this.echart)

    return {
      type: 'text',
      position: pos,
      z: 100,
      style: {
        text: this.text,
        fill: '#ddd',
      },
    }
  }

  mousedown(x: number, y: number) {
    // nothing
  }

  mousemove(x: number, y: number) {
    return false // mousemove is always irrelevant
  }

  mouseup(x: number, y: number) {
    if (this.echart) {
      if (!this.position) {
        this.position = new ChartGraphicPosition()
      }

      this.position.set(this.echart, x, y)
    }

    return this.$isValidToSave // edit is done if it already had the text before the click
  }
}
