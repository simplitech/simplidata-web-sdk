import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'

export class TextChartGraphic extends ChartGraphic {
  $name = 'TextChartGraphic'

  @ResponseSerialize(ChartGraphicPosition)
  position: ChartGraphicPosition | null = null

  text = ''

  cleanCopy(): ChartGraphic {
    return new TextChartGraphic()
  }

  get $isValidToSave() {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts): any {
    if (!this.position || !this.text.length) {
      return null
    }

    const pos = this.position.get(echart)

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

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    // nothing
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    return false // mousemove is always irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (!this.position) {
      this.position = new ChartGraphicPosition()
    }

    this.position.set(echart, x, y)

    return this.$isValidToSave // edit is done if it already had the text before the click
  }
}
