import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { TextChartGraphic } from './TextChartGraphic'
import { ChartGraphicPosition } from './ChartGraphicPosition'

export class CommentChartGraphic extends TextChartGraphic {
  $name = 'CommentChartGraphic'
  openCommentCallback: (comment: CommentChartGraphic) => any

  constructor(openCommentCallback: (comment: CommentChartGraphic) => any) {
    super()
    this.openCommentCallback = openCommentCallback
  }

  cleanCopy(): ChartGraphic {
    return new CommentChartGraphic(this.openCommentCallback)
  }

  get $isValidToSave(): boolean {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts): any {
    this.echart = echart

    if (!this.position) {
      return null
    }

    const pos = this.position.get(this.echart)

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
          this.openCommentCallback(this)
        }
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

    return false // edit is done only manually
  }
}
