import echarts from 'echarts'
import ChartBus from '../../../utils/ChartBus'
import { ChartGraphic } from './ChartGraphic'
import { TextChartGraphic } from './TextChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'

export class CommentChartGraphic extends TextChartGraphic {
  name = 'CommentChartGraphic'

  cleanCopy(): ChartGraphic {
    const copy = new CommentChartGraphic()
    copy.color = this.color
    return copy
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
        fill: this.color,
      },
      shape: {
        cx: 0,
        cy: 0,
        r: 7,
      },
      onclick: () => {
        if (this.isValidToSave) {
          ChartBus.$emit('openComment', this)
        }
      },
    }
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (!this.position) {
      this.position = new ChartGraphicPosition()
    }

    this.position.set(echart, x, y)
  }
}
