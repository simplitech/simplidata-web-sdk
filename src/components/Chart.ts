const template = `
  <div class="simplidata-chart">

    <div class="horiz">

      <div class="verti w-40 mt-60">

        <div v-if="showSaveButton" class="chart-save h-40 mb-8 items-center"></div>

        <template v-if="showDrawingButtons">
          <div class="chart-line h-40 mb-8 items-center"></div>

          <div class="chart-pencil h-40 mb-8 items-center"></div>

          <div class="chart-text h-40 mb-8 items-center"></div>
        </template>

        <div v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"></div>

        <div v-if="showCalcButton" class="chart-calc h-40 mb-8 items-center"></div>

        <div v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"></div>

      </div>

      <div class="verti weight-1 mx-5">

        <div class="horiz">

          <select-group v-if="showChartTypeControl"
            class="w-130 mr-40 my-5"
            :label="$t('view.chart.chartAs')"
            v-model="value.chartType"
            :items="allChartTypes"/>

          <select-group v-if="showValueTypeControl"
            class="w-200 mr-40 my-5"
            :label="$t('view.chart.valuesOfType')"
            :empty="$t('view.chart.allPeriod')"
            v-model="value.valueType"
            :items="allValueTypes"/>

          <select-group v-if="showTransformationTypeControl"
            class="w-160 mr-40 my-5"
            :label="$t('view.chart.transformation')"
            :empty="$t('view.chart.none')"
            v-model="value.transformationType"
            :items="allTransformationTypes.items"/>

          <button class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
        </div>

        <div class="min-h-400" id="echart" ref="echart"></div>

      </div>

      <div v-if="selectedOa.$id && showObjectOfAnalysisInfo"
      class="rightpanel verti w-300 pl-30">

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

        <div v-if="showOaVersionControl"
          v-for="version in selectedOa.oaVersions"
          :key="version.idOaVersionPk"
          class="horiz mb-9">
          <div class="value weight-1">{{ version.title }}</div>
          <div class="value weight-1 text-center">
            {{ version.lastDataset.creationDate | moment($t('dateFormat.datesimple')) }}
          </div>
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
  WithDataset,
  OaData,
} from '../models'
import { Collection } from 'simpli-web-sdk'
import SelectGroup from './SelectGroup'

export interface ChartDataset {
  [key: string]: number[]
}

@Component({
  template,
  components: { SelectGroup },
})
export class Chart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Number })
  savedChartId?: number

  @Prop({ type: Array })
  objectOfAnalysisIds?: number[]

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

  @Prop({ type: Boolean, default: true })
  showObjectOfAnalysisInfo: boolean = true

  @Prop({ type: Boolean, default: false })
  showOaVersionControl: boolean = false

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
  allTransformationTypes = new Collection(TransformationType)

  selectedOa = new ObjectOfAnalysis()

  echart: echarts.ECharts | null = null

  created() {
    // this.mockAll()
  }

  async mounted() {
    this.initEChart()
    await this.populateData()
  }

  async populateData() {
    await this.allTransformationTypes.query()

    if (this.value && !this.value.$id) {
      if (this.savedChartId) {
        await this.value.find(this.savedChartId)
      } else if (this.objectOfAnalysisIds && this.objectOfAnalysisIds.length) {
        let firstOa: ObjectOfAnalysis | null = null
        for (const id of this.objectOfAnalysisIds) {
          if (id) {
            const oa = new ObjectOfAnalysis()
            await oa.find(id)
            if (!firstOa) {
              firstOa = oa
            }
            this.value.datasets.push(oa)
          }
        }
        if (firstOa) {
          this.allChartTypes = firstOa.oaChartTypeAvailability
          this.allValueTypes = firstOa.oaValueTypeAvailability
        }
      }
    }
  }

  @Watch('value.datasets')
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

    const map: ChartDataset = {}

    this.value.datasets.forEach((item: WithDataset) => {
      if (!item || !item.$dataset || !item.$dataset.oaDataList) {
        return
      }
      item.$dataset.oaDataList.forEach((data: OaData) => {
        if (!map[data.dt]) map[data.dt] = []
        map[data.dt].push(data.value)
      })
    })

    const result: any[] = []

    for (const i in map) {
      if (i) {
        result.push([i, ...map[i]])
      }
    }

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

  async mockAll() {
    if (!this.value) {
      return
    }

    this.value.chartType.$id = 1
    this.value.chartType.$tag = 'linha'

    const newCT = new ChartType()
    newCT.$id = 1
    newCT.$tag = 'linha'
    this.allChartTypes.push(newCT)

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

    const oa = new ObjectOfAnalysis()
    oa.oaVersions = []
    oa.oaVersions[0] = new OaVersion()
    oa.oaVersions[0].lastDataset = new OaDataset()
    oa.$dataset.oaDataList = []

    let oaData = new OaData()
    oaData.dt = 'mon'
    oaData.value = 3
    oa.$dataset.oaDataList.push(oaData)

    oaData = new OaData()
    oaData.dt = 'tue'
    oaData.value = 5
    oa.$dataset.oaDataList.push(oaData)

    this.value.datasets.push(oa)
  }
}
