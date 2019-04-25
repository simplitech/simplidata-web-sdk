import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPosition } from '../ChartGraphicPosition'
import { ResponseSerialize } from '../../../simpli'
import ChartBus from '../../../utils/ChartBus'

export class TextChartGraphic extends ChartGraphic {
  name = 'TextChartGraphic'
  fontSize: number
  text: string

  @ResponseSerialize(ChartGraphicPosition)
  position: ChartGraphicPosition | null

  constructor(
    fontSize: number = 16,
    position: ChartGraphicPosition | null = null,
    text: string = '',
    isDone: boolean = false,
    color: string = '#dddddd'
  ) {
    super(isDone, color)
    this.fontSize = fontSize
    this.position = position
    this.text = text
  }

  cleanCopy(): ChartGraphic {
    const copy = new TextChartGraphic()
    copy.color = this.color
    copy.fontSize = this.fontSize
    return copy
  }

  clone(): ChartGraphic {
    return new TextChartGraphic(
      this.fontSize,
      this.position ? this.position.clone() : null,
      this.text,
      this.isDone,
      this.color
    )
  }

  get isValidToSave() {
    return this.position !== null && this.text.length > 0
  }

  build(echart: echarts.ECharts, allowInteraction: boolean): any {
    if (!this.position || !this.text.length) {
      return null
    }

    const pos = this.position.get(echart)

    return {
      ignore: !this.isDone, // is shown only before edit
      type: 'text',
      position: pos,
      z: 100,
      style: {
        text: this.text,
        fill: this.color,
        font: `${this.fontSize}px CircularStd`,
      },
      draggable: allowInteraction,
      ondragstart: (e: any) => ChartBus.$emit('graphicDragStart', [e.offsetX, e.offsetY]),
      ondragend: (e: any) => ChartBus.$emit('graphicDragEnd', { graphic: this, pos: [e.offsetX, e.offsetY] }),
      onclick: () => ChartBus.$emit('graphicSelect', this),
    }
  }

  offsetPosition(echart: echarts.ECharts, x: number, y: number) {
    if (this.position) {
      this.position.increaseBy(echart, x, y)
    }
  }

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    // nothing
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    return false // mousemove is always irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (this.isValidToSave) {
      ChartBus.$emit('doneDrawing')
    } else if (!this.position) {
      this.position = new ChartGraphicPosition()
      this.position.set(echart, x, y)
    } else {
      ChartBus.$emit('cancelDrawing')
    }
  }
}
