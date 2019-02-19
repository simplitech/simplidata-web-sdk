import echarts from 'echarts'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPositionWithData } from '../ChartGraphicPositionWithData'
import { ResponseSerialize } from '../../../simpli'
import { ChartGraphicPosition } from '../ChartGraphicPosition'

export class FibonacciRetractionChartGraphic extends ChartGraphic {
  name = 'FibonacciRetractionChartGraphic'

  @ResponseSerialize(ChartGraphicPositionWithData)
  p1: ChartGraphicPositionWithData | null = null

  @ResponseSerialize(ChartGraphicPositionWithData)
  p2: ChartGraphicPositionWithData | null = null

  parts = [
    { heightPct: 0.382, rgb: [0, 255, 0] },
    { heightPct: 0.118, rgb: [120, 120, 255] },
    { heightPct: 0.118, rgb: [255, 255, 0] },
    { heightPct: 0.146, rgb: [255, 120, 0] },
    { heightPct: 0.236, rgb: [255, 0, 0] },
  ]

  cleanCopy() {
    return new FibonacciRetractionChartGraphic()
  }

  get isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  build(echart: echarts.ECharts) {
    if (!this.p1 || !this.p2) {
      return null
    }

    const p1Pos = this.p1.get(echart)
    const p2Pos = this.p2.get(echart)
    const width = Math.abs(p2Pos[0] - p1Pos[0])
    const height = Math.abs(p2Pos[1] - p1Pos[1])

    const children: any[] = this.parts.map((part, i) => ({
      type: 'group',
      top: this.getPosOfPart(i, height),
      children: [
        {
          type: 'line',
          style: {
            stroke: `rgba(${part.rgb[0]}, ${part.rgb[1]}, ${part.rgb[2]}, 0.5)`,
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: width,
            y2: 0,
          },
        },
        {
          type: 'text',
          left: width + 5,
          top: -4,
          style: {
            text: this.getAxisYOfPart(i).toFixed(3),
            fill: `rgba(${part.rgb[0]}, ${part.rgb[1]}, ${part.rgb[2]}, 0.5)`,
          },
        },
        {
          type: 'rect',
          style: {
            stroke: null,
            fill: `rgba(${part.rgb[0]}, ${part.rgb[1]}, ${part.rgb[2]}, 0.1)`,
          },
          shape: {
            x: 0,
            y: 0,
            r: 1,
            width,
            height: height * part.heightPct,
          },
        },
      ],
    }))

    // the last text on the bottom
    children.push({
      type: 'text',
      left: width + 5,
      top: height - 4,
      style: {
        text: Math.max(this.p1.axisY, this.p2.axisY).toFixed(3),
        fill: '#ddd',
      },
    })

    return {
      type: 'group',
      position: [Math.min(p1Pos[0], p2Pos[0]), Math.min(p1Pos[1], p2Pos[1])],
      z: 100,
      children,
    }
  }

  getPosOfPart(i: number, height: number) {
    return this.parts.slice(0, i).reduce((sum, prev) => sum + height * prev.heightPct, 0)
  }

  getAxisYOfPart(i: number) {
    if (!this.p1 || !this.p2) {
      return 0
    }

    const axisDiff = Math.abs(this.p2.axisY - this.p1.axisY)
    const partsBeforeI = this.parts.slice(0, i)
    const sumOfAxisYOfPartsBeforeI = partsBeforeI.reduce((sum, prev) => sum + axisDiff * prev.heightPct, 0)

    return Math.min(this.p1.axisY, this.p2.axisY) + sumOfAxisYOfPartsBeforeI
  }

  mousedown(echart: echarts.ECharts, x: number, y: number) {
    if (!this.p1) {
      this.p1 = new ChartGraphicPositionWithData()
    }

    this.p1.set(echart, x, y)
  }

  mousemove(echart: echarts.ECharts, x: number, y: number) {
    if (this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPositionWithData()
      }

      this.p2.set(echart, x, y)

      return true // mousemove is relevant
    }

    return false // mousemove is irrelevant
  }

  mouseup(echart: echarts.ECharts, x: number, y: number) {
    if (this.p1) {
      if (!this.p2) {
        this.p2 = new ChartGraphicPositionWithData()
      }

      this.p2.set(echart, x, y)
      this.isDone = true
    }
  }
}
