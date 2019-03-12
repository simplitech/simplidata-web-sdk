const template = `
  <div class="echart-holder">
    <graphic-editor-overlay v-model="value" v-if="showDrawingButtons" :graphicBeingBuilt="graphicBeingBuilt" :echart="echart"/>
    <div id="echart" ref="echart" class="h-full"></div>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import moment from 'moment'
import { UserSavedChart, ChartGraphic } from '../../models'
import { colors } from '../../const/colors.const'
import { error } from '../../simpli'
import GraphicEditorOverlay from './GraphicEditorOverlay'

@Component({
  template,
  components: { GraphicEditorOverlay },
})
export default class EChart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object })
  graphicBeingBuilt?: ChartGraphic

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

  echart: echarts.ECharts | null = null
  colors = colors

  get chartOptions() {
    return {
      grid: { right: 25, left: '7%', top: '5%' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { opacity: 0.1 } },
        boundaryGap: false,
      },
      color: this.colors,
    }
  }

  get startIndexLimiter() {
    return this.value ? this.indexLimiterFromDt(this.value.startDtLimiter, true) : null
  }

  set startIndexLimiter(val) {
    if (!this.value || !val) {
      return
    }

    this.value.startDtLimiter = this.dtLimiterFromIndex(val)
  }

  get endIndexLimiter() {
    return this.value ? this.indexLimiterFromDt(this.value.endDtLimiter, false) : null
  }

  set endIndexLimiter(val) {
    if (!this.value || !val) {
      return
    }

    this.value.endDtLimiter = this.dtLimiterFromIndex(val)
  }

  get dataZoom() {
    const dataZoom: any = [
      {
        xAxisIndex: [0],
        type: 'slider',
        show: false,
      },
    ]

    if (this.startIndexLimiter !== null) {
      dataZoom[0].startValue = this.startIndexLimiter
    }

    if (this.endIndexLimiter !== null) {
      dataZoom[0].endValue = this.endIndexLimiter
    }

    return dataZoom
  }

  @Watch('value.chartData')
  @Watch('dataZoom')
  @Watch('chartGraphics')
  @Watch('graphicBeingBuilt')
  @Watch('graphicBeingBuilt.text')
  @Watch('value.graphics', { deep: true })
  updateChartData() {
    if (!this.echart || !this.value) {
      return
    }

    let series = this.value.itensRFU.map(d => ({
      type: 'line',
      smooth: true,
    }))

    if (this.startIndexLimiter === -1 || this.endIndexLimiter === -1) {
      error('system.error.noData')
      series = []
    }

    const option = {
      ...this.chartOptions, // echarts bug: we need to merge manually instead of merging on setOptions
      dataset: {
        source: this.value.chartData,
      },
      series,
      dataZoom: this.dataZoom,
      graphic: this.buildChartGraphics(),
    }

    this.echart.setOption(option, true)
  }

  mounted() {
    const el = this.$refs.echart as HTMLDivElement

    this.echart = echarts.init(el)

    this.echart.setOption(this.chartOptions)

    this.echart.on('dataZoom', (e: echarts.EChartsDataZoomEvent) => {
      if (!this.echart || !this.echart.getModel() || !this.value) {
        return
      }
      const axis = this.echart.getModel().option.xAxis[0]
      this.startIndexLimiter = axis.rangeStart
      this.endIndexLimiter = axis.rangeEnd
    })

    window.addEventListener('resize', () => {
      this.refresh()
    })

    el.onmousedown = ((e: MouseEvent) => {
      if (!this.echart || !this.graphicBeingBuilt) {
        return
      }

      this.graphicBeingBuilt.mousedown(this.echart, e.offsetX, e.offsetY)
    }).bind(this)

    el.onmousemove = ((e: MouseEvent) => {
      if (!this.echart || !this.graphicBeingBuilt) {
        return
      }

      const mouseMoveWasRelevant = this.graphicBeingBuilt.mousemove(this.echart, e.offsetX, e.offsetY)

      if (mouseMoveWasRelevant) {
        this.updateChartData()
      }
    }).bind(this)

    el.onmouseup = ((e: MouseEvent) => {
      if (!this.value || !this.echart || !this.graphicBeingBuilt) {
        return
      }

      this.graphicBeingBuilt.mouseup(this.echart, e.offsetX, e.offsetY)

      this.updateChartData()
    }).bind(this)
  }

  buildChartGraphics() {
    if (!this.echart || !this.value) {
      return
    }

    const ee = this.echart

    const graphic: any[] = []

    this.value.graphics.forEach(g => this.addGraphic(graphic, g.build(ee, colors)))

    if (this.graphicBeingBuilt) {
      this.addGraphic(graphic, this.graphicBeingBuilt.build(this.echart, colors))
    }

    return graphic
  }

  addGraphic(graphicArr: any[], aGraphic: any) {
    if (!aGraphic) {
      return
    }

    if (aGraphic instanceof Array) {
      aGraphic.forEach(gg => graphicArr.push(gg))
    } else {
      graphicArr.push(aGraphic)
    }
  }

  refresh() {
    if (!this.echart) {
      return
    }

    this.echart.resize()
  }

  indexLimiterFromDt(dt: string | null, after: boolean) {
    if (!this.value || !this.value.chartData || !dt) {
      return null
    }

    const dtMoment = moment(dt)
    const dtFormat: string = this.$t('system.format.date').toString()

    const indexedChartData = this.value.chartData.map((c, i) => ({ ind: i, val: c[0] })).filter(c => {
      const cMoment = moment(c.val, dtFormat)
      const isSame = cMoment.isSame(dtMoment)
      const isAfter = cMoment.isAfter(dtMoment)

      return isSame || isAfter === after
    })

    indexedChartData.sort((x, y) => {
      const diffXFromDt = Math.abs(dtMoment.diff(x.val, 'minutes'))
      const diffYFromDt = Math.abs(dtMoment.diff(y.val, 'minutes'))
      return diffXFromDt > diffYFromDt ? 1 : diffXFromDt === diffYFromDt ? 0 : -1
    })

    if (indexedChartData.length) {
      const index = indexedChartData[0].ind

      if (index !== -1) {
        return index
      }
    }

    return -1
  }

  dtLimiterFromIndex(index: number) {
    if (this.value && this.value.chartData && this.value.chartData[index]) {
      const dtFormat: string = this.$t('system.format.date').toString()
      return moment(this.value.chartData[index][0], dtFormat).format('YYYY-MM-DD')
    } else {
      return null
    }
  }
}
