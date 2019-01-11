const template = `
  <div id="echart" ref="echart"></div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import moment from 'moment'
import { UserSavedChart } from '../../models'
import { colors } from '../../const/colors.const'

@Component({
  template,
})
export default class EChart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

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
      dataZoom: [
        {
          type: 'slider',
          show: false,
        },
      ],
    }
  }

  get startIndexLimiter() {
    return this.value ? this.indexLimiterFromDt(this.value.startDtLimiter, true) : 0
  }

  set startIndexLimiter(val) {
    if (!this.value || !val) {
      return
    }

    this.value.startDtLimiter = this.dtLimiterFromIndex(val)
  }

  get endIndexLimiter() {
    return this.value ? this.indexLimiterFromDt(this.value.endDtLimiter, false) : 0
  }

  set endIndexLimiter(val) {
    if (!this.value || !val) {
      return
    }

    this.value.endDtLimiter = this.dtLimiterFromIndex(val)
  }

  @Watch('value.chartData')
  updateChartData() {
    if (!this.echart || !this.value) {
      return
    }

    const option = {
      ...this.chartOptions, // echarts bug: we need to merge manually instead of merging on setOptions
      dataset: {
        source: this.value.chartData,
      },
      series: this.value.itensRFU.map(d => ({
        type: 'line',
        smooth: true,
      })),
    }

    this.echart.setOption(option, true)
  }

  @Watch('startIndexLimiter')
  @Watch('endIndexLimiter')
  updateDataZoom() {
    if (!this.echart || !this.value) {
      return
    }

    const dataZoom: any = {
      xAxisIndex: [0],
    }

    dataZoom.startValue = this.startIndexLimiter
    dataZoom.endValue = this.endIndexLimiter

    this.echart.setOption({
      dataZoom,
    })
  }

  async mounted() {
    this.initEChart()
  }

  initEChart() {
    const el = this.$refs.echart as HTMLDivElement

    this.echart = echarts.init(el)

    this.echart.setOption(this.chartOptions)

    // setTimeout(() => {
    //   if (!this.echart) {
    //     return
    //   }
    //
    //   this.echart.setOption({
    //     graphic: [
    //       {
    //         type: 'text',
    //         position: this.value.graphics[0].getPosition(this.echart),
    //         z: 100,
    //         style: {
    //           fill: '#333',
    //           text: 'Hey dude',
    //         },
    //       },
    //     ],
    //   })
    // }, 0)

    this.echart.on('dataZoom', (e: echarts.EChartsDataZoomEvent) => {
      if (!this.echart || !this.echart.getModel() || !this.value) {
        return
      }
      const axis = this.echart.getModel().option.xAxis[0]
      this.startIndexLimiter = axis.rangeStart
      this.endIndexLimiter = axis.rangeEnd
      this.updateGraphicPos()
    })

    window.addEventListener('resize', () => {
      this.resize()
    })

    // el.onclick = (e: MouseEvent) => {
    //   if (!this.echart) {
    //     return
    //   }
    //
    //   this.value.graphics[0].setPosition(this.echart, e.offsetX, e.offsetY)
    //
    //   this.updateGraphicPos()
    // }
  }

  resize() {
    if (!this.echart) {
      return
    }

    this.echart.resize()
  }

  updateGraphicPos() {
    if (!this.echart) {
      return
    }

    // this.echart.setOption({
    //   graphic: {
    //     position: this.value.graphics[0].getPosition(this.echart),
    //   },
    // })
  }

  indexLimiterFromDt(dt: string | null, after: boolean) {
    if (!this.value || !this.value.chartData || !dt) {
      return 0
    }

    const dtMoment = moment(dt)
    const dtFormat: string = this.$t('system.format.date').toString()

    const indexedChartData = this.value.chartData
      .map((c, i) => ({ ind: i, val: c[0] }))
      .filter(c => dtMoment.isSame(moment(c.val, dtFormat)) || dtMoment.isAfter(moment(c.val, dtFormat)) !== after)

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

    return 0
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
