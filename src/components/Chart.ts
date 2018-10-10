const template = `
  <div class="simplidata-chart">

    <div class="horiz">

      <div class="verti w-40 mt-60">

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-save.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-draw-line.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-pencil.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-text.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-measure.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-calc.svg"/>
        </div>

        <div class="chart-button h-40 mb-8 items-center">
          <img class="w-20" src="../assets/img/chart-comment.svg"/>
        </div>

      </div>

      <div class="verti weight-1 mx-5">

        <div class="horiz">
          <select-group class="w-130 mr-40 my-5" :label="$t('view.chart.chartAs')"
                        v-model="value.chartType" :items="allChartTypes"/>
          <select-group class="w-200 mr-40 my-5" :label="$t('view.chart.valuesOfType')" :empty="$t('view.chart.allPeriod')"
                        v-model="value.valueType" :items="allValueTypes"/>
          <select-group class="w-160 mr-40 my-5" :label="$t('view.chart.transformation')" :empty="$t('view.chart.none')"
                        v-model="value.transformationType" :items="allTransformationTypes"/>

          <button class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
        </div>

        <div class="min-h-400" id="echart" ref="echart"></div>

      </div>

      <div v-if="selectedOa" class="rightpanel verti w-300 pl-30">

        <h1 class="mb-10">{{ selectedOa.title }}</h1>

        <div class="description mb-25">{{ selectedOa.comment }}</div>

        <div class="horiz mb-10">
          <div class="label weight-1">{{ $t('view.chart.periodicity') }}</div>
          <div class="value">{{ selectedOa.periodicity.title }}</div>
        </div>

        <div class="horiz mb-10">
          <div class="label weight-1">{{ $t('view.chart.unity') }}</div>
          <div class="value">{{ selectedOa.unity.title }}</div>
        </div>

        <div class="horiz mb-10">
          <div class="label weight-1">{{ $t('view.chart.source') }}</div>
          <div class="value">{{ selectedOa.source.title }}</div>
        </div>

        <div class="horiz mb-30">
          <div class="label weight-1">{{ $t('view.chart.lastUpdate') }}</div>
          <div class="value">{{ selectedOa.lastUpdate | moment($t('dateFormat.datesimple')) }}</div>
        </div>

        <div class="horiz mb-15 items-center-bottom">
          <div class="label weight-1">{{ $t('view.chart.version') }}</div>
          <div class="label weight-1 text-center">{{ $t('view.chart.lastUpdate') }}</div>
          <div class="label weight-1 text-right">{{ $t('view.chart.status') }}</div>
        </div>

        <div v-for="version in selectedOa.oaVersions" :key="version.idOaVersionPk" class="horiz mb-9">
          <div class="value weight-1">{{ version.title }}</div>
          <div class="value weight-1 text-center">{{ version.lastDataset.creationDate | moment($t('dateFormat.datesimple')) }}</div>
          <div class="value weight-1 text-right">{{ version.oaVersionStatus.title }}</div>
        </div>

      </div>

    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import moment from 'moment'
import {
  ChartType,
  ValueType,
  TransformationType,
  ObjectOfAnalysis,
  OaPeriodicity,
  OaUnity,
  OaSource,
  OaVersion,
  OaDataset,
  OaVersionStatus,
  ChartGraphic,
  UserSavedChart,
} from '../models'
import SelectGroup from './SelectGroup'

@Component({
  template,
  components: { SelectGroup },
})
export class Chart extends Vue {
  @Prop({ type: Array })
  objectOfAnalysisIds?: number[]

  @Prop({ type: Number })
  savedChartId?: number

  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showSaveButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showDrawingButtons: boolean = true

  @Prop({ type: Boolean, default: true })
  showMeasureButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showCalcButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showCommentButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showChartTypeControl: boolean = true

  @Prop({ type: Boolean, default: true })
  showValueTypeControl: boolean = true

  @Prop({ type: Boolean, default: true })
  showTransformationTypeControl: boolean = true

  @Prop({ type: Boolean, default: false })
  showOaVersionControl: boolean = false

  @Prop({ type: Boolean, default: true })
  showObjectOfAnalysisInfo: boolean = true

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Number })
  valueTypeId?: number

  @Prop({ type: Number })
  transformationTypeId?: number

  @Prop({ type: Number })
  oaVersionId?: number

  allChartTypes: ChartType[] = []
  allValueTypes: ValueType[] = []
  allTransformationTypes: TransformationType[] = []

  selectedOa?: ObjectOfAnalysis

  echart?: echarts.ECharts

  created() {
    this.mockAll()
  }

  mounted() {
    this.initEChart()
    this.updateChartData()
  }

  // @Watch('value.datasets')
  updateChartData() {
    if (!this.echart) {
      return
    }

    this.echart.setOption({
      dataset: {
        source: this.transformDatasets(),
      },
    })
  }

  transformDatasets() {
    if (!this.value || !this.value.datasets || !this.value.datasets.length) {
      return
    }

    const map = {}

    this.value.datasets.forEach(item => {
      if (!item || !item.$dataset || !item.$dataset.oaDataList) {
        return
      }
      item.$dataset.oaDataList.forEach(data => {
        if (!map[data.dt]) map[data.dt] = []
        map[data.dt].push(data.value)
      })
    })

    const result: any[] = []

    Object.keys(map).forEach(i => {
      result.push([i, ...map[i]])
    })

    return result
  }

  initEChart() {
    const el = this.$refs.echart as HTMLDivElement
    this.echart = echarts.init(el)

    this.echart.setOption({
      grid: { right: 25, left: '7%', top: '5%' },
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
      color: ['#29FD34', '#ffa800', '#78cdff'],
      series: [
        {
          type: 'line',
          smooth: true,
        },
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleStyle: { opacity: 0 },
          borderColor: 'rgba(0,0,0,0)',
          fillerColor: 'rgba(255,255,255,0.1)',
          height: 10,
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          handleStyle: { opacity: 0 },
          borderColor: 'rgba(0,0,0,0)',
          fillerColor: 'rgba(255,255,255,0.1)',
          width: 10,
        },
        { type: 'inside', show: true, xAxisIndex: [0] },
        { type: 'inside', show: true, yAxisIndex: [0] },
      ],
    })

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
      this.updateGraphicPos()
    })

    window.addEventListener('resize', () => {
      if (!this.echart) {
        return
      }

      this.echart.resize()
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

  mockAll() {
    if (!this.value) {
      return
    }

    this.value.chartType.$id = 1
    this.value.chartType.$tag = 'linha'
    this.allChartTypes.push(this.value.chartType)

    this.value.graphics.push(new ChartGraphic())

    this.selectedOa = new ObjectOfAnalysis()
    this.selectedOa.title = 'Estoque de Crédito - PF'
    this.selectedOa.comment =
      'Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum ' +
      'rutrum, neque sem pretium metus, quis mollis nisl nunc et massa.  ' +
      'Nam dapibus nisl vitae elit fringilla rutrum. '

    this.selectedOa.periodicity = new OaPeriodicity()
    this.selectedOa.periodicity.title = 'Trimestral'

    this.selectedOa.unity = new OaUnity()
    this.selectedOa.unity.title = 'Toneladas'

    this.selectedOa.source = new OaSource()
    this.selectedOa.source.title = 'Ipeadata'

    this.selectedOa.lastUpdate = moment().format()

    const oaVersion = new OaVersion()
    oaVersion.idOaVersionPk = 1
    oaVersion.title = 'Release'
    this.selectedOa.oaVersions.push(oaVersion)

    const lastDataset = new OaDataset()
    lastDataset.creationDate = moment().format()
    this.selectedOa.oaVersions[0].lastDataset = lastDataset

    const oaVersionStatus = new OaVersionStatus()
    oaVersionStatus.title = 'Ok'
    this.selectedOa.oaVersions[0].oaVersionStatus = oaVersionStatus
  }
}
