import echarts from 'echarts'
import ChartBus from '../../../utils/ChartBus'
import { ChartGraphic } from './ChartGraphic'
import { TextChartGraphic } from './TextChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'

export class CommentChartGraphic extends TextChartGraphic {
  $name = 'CommentChartGraphic'

  cleanCopy(): ChartGraphic {
    return new CommentChartGraphic()
  }

  get $isValidToSave(): boolean {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts): any {
    if (!this.position) {
      return null
    }

    const pos = this.position.get(echart)

    return {
      type: 'circle',
      position: pos,
      z: 100,
      style: {
        stroke: '#1a1a1a',
        fill: '#ffffff',
      },
      shape: {
        cx: 0,
        cy: 0,
        r: 7,
      },
      onclick: () => {
        if (this.$isValidToSave) {
          ChartBus.$emit('openComment', this)
        }
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

    return false // edit is done only manually
  }
}
