import echarts from 'echarts'
import moment from 'moment'
import { $ } from 'simpli-web-sdk'
import { ChartGraphic } from './ChartGraphic'
import { ChartGraphicPositionWithData } from './ChartGraphicPositionWithData'
import { ResponseSerialize } from '../../simpli'

export class MeasureChartGraphic implements ChartGraphic {
  $name = 'MeasureChartGraphic'
  $isDone = false
  $isCancelled = false

  @ResponseSerialize(ChartGraphicPositionWithData)
  p1: ChartGraphicPositionWithData | null = null

  @ResponseSerialize(ChartGraphicPositionWithData)
  p2: ChartGraphicPositionWithData | null = null

  cleanCopy() {
    return new MeasureChartGraphic()
  }

  get $isValidToSave(): boolean {
    return this.p1 !== null && this.p2 !== null
  }

  get dateDiff() {
    if (!this.p1 || !this.p2 || !this.p1.date || !this.p2.date) {
      return ''
    }

    const dtFormat: string = $.t('system.format.date').toString()
    const daysF: string = $.t('system.format.days').toString()
    const timeF: string = $.t('system.format.time').toString()
    const d1 = moment(this.p1.date, dtFormat)
    const d2 = moment(this.p2.date, dtFormat)
    const days = Math.abs(d2.diff(d1, 'd'))
    const time = moment(d2.diff(d1)).format(timeF)
    return `${days > 0 ? `${days} ${daysF}` : ''} ${days > 3 ? '' : time}`
  }

  get verticalDiff() {
    if (!this.p1 || !this.p2) {
      return ''
    }

    return Math.abs(this.p2.axisY - this.p1.axisY).toFixed(3)
  }

  get valuesDiff(): string[] {
    if (!this.p1 || !this.p1.values.length) {
      return []
    }

    return this.p1.values.map((p1v, i) => {
      if (this.p2 && this.p2.values.length > i) {
        const p2v = this.p2.values[i]
        return Math.abs(p2v - p1v).toFixed(3)
      } else {
        return ''
      }
    })
  }

  build(echart: echarts.ECharts, colors: string[] | null) {
    if (!this.p1 || !this.p2) {
      return null
    }

    const p1Pos = this.p1.get(echart)
    const p2Pos = this.p2.get(echart)
    const width = p2Pos[0] - p1Pos[0]
    const height = p2Pos[1] - p1Pos[1]

    return {
      type: 'group',
      position: p1Pos,
      z: 100,
      children: [
        {
          type: 'rect',
          style: {
            stroke: '#ddd',
            fill: null,
          },
          shape: {
            x: 0,
            y: 0,
            r: 1,
            width,
            height,
          },
        },
        {
          type: 'text',
          left: width + 5,
          style: {
            text: `${this.dateDiff}\n${this.verticalDiff}`,
            fill: '#ddd',
          },
        },
        ...this.valuesDiff.map((text, i) => ({
          type: 'group',
          left: width + 5,
          top: 12 * (i + 2),
          children: [
            {
              type: 'circle',
              style: {
                stroke: null,
                fill: colors && colors.length > i ? colors[i] : '#ffffff',
              },
              shape: {
                cx: 6,
                cy: 6,
                r: 5,
              },
            },
            {
              type: 'text',
              left: 15,
              style: {
                text,
                fill: '#ddd',
              },
            },
          ],
        })),
      ],
    }
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

      return true // done editing
    }

    return false // edit is not done
  }
}
