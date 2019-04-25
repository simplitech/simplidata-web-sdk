import echarts from 'echarts'
import ChartBus from '../../../utils/ChartBus'
import { ChartGraphic } from './ChartGraphic'
import { TextChartGraphic } from './TextChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'

export class CommentChartGraphic extends TextChartGraphic {
  name = 'CommentChartGraphic'

  constructor(
    fontSize: number = 16,
    position: ChartGraphicPosition | null = null,
    text: string = '',
    isDone: boolean = false,
    color: string = '#dddddd'
  ) {
    super(fontSize, position, text, isDone, color)
  }

  cleanCopy(): ChartGraphic {
    const copy = new CommentChartGraphic()
    copy.color = this.color
    return copy
  }

  clone(): ChartGraphic {
    return new CommentChartGraphic(this.fontSize, this.position, this.text, this.isDone, this.color)
  }

  build(echart: echarts.ECharts, allowInteraction: boolean): any {
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
      draggable: allowInteraction,
      ondragstart: (e: any) => ChartBus.$emit('graphicDragStart', [e.offsetX, e.offsetY]),
      ondragend: (e: any) => ChartBus.$emit('graphicDragEnd', { graphic: this, pos: [e.offsetX, e.offsetY] }),
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
