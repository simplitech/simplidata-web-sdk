const template = `
  <div class="simplidata-chart verti">

    <div class="horiz weight-1">

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
            :items="allChartTypes.items"/>

          <select-group v-if="showValueTypeControl"
            class="w-200 mr-40 my-5"
            :label="$t('view.chart.valuesOfType')"
            :empty="$t('view.chart.allPeriod')"
            v-model="value.valueType"
            :items="allValueTypes.items"/>

          <select-group v-if="showTransformationTypeControl"
            class="w-160 mr-40 my-5"
            :label="$t('view.chart.transformation')"
            :empty="$t('view.chart.none')"
            v-model="value.transformationType"
            :items="allTransformationTypes.items"/>

          <button class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
        </div>

        <div class="weight-1 min-h-400" id="echart" ref="echart"></div>

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

        <div v-if="showOaVersionControl"
          v-for="version in selectedOa.oaVersions"
          :key="version.idOaVersionPk"
          class="version horiz items-center mb-9 pl-30"
          :class="{ selected: version.$id === selectedOaSelectedVersionId }"
          @click="selectVersion(version.$id)">
          <div class="weight-1">{{ version.title }}</div>
          <div class="weight-1 text-center">
            {{ version.lastDataset.creationDate | moment($t('dateFormat.datesimple')) }}
          </div>
          <div class="weight-1 text-right">{{ version.oaVersionStatus.title }}</div>
        </div>
        
        <div class="weight-1"></div>
        
        <a v-if="showVisitButton" class="self-center btn basic mb-20">{{ $t('view.chart.accessAnalysis') }}</a>

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
  showSaveButton?: boolean

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

  @Prop({ type: Boolean, default: true })
  showMeasureButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCalcButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCommentButton?: boolean

  @Prop({ type: Boolean, default: true })
  showChartTypeControl?: boolean

  @Prop({ type: Boolean, default: true })
  showValueTypeControl?: boolean

  @Prop({ type: Boolean, default: true })
  showTransformationTypeControl?: boolean

  @Prop({ type: Boolean, default: true })
  showObjectOfAnalysisInfo?: boolean

  @Prop({ type: Boolean, default: false })
  showOaVersionControl?: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton?: boolean

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Number })
  valueTypeId?: number

  @Prop({ type: Number })
  transformationTypeId?: number

  @Prop({ type: Array, default: () => [] })
  oaVersionIds?: number[]

  allChartTypes = new Collection(ChartType)
  allValueTypes = new Collection(ValueType)
  allTransformationTypes = new Collection(TransformationType)

  selectedDatasetIndex = 0

  echart: echarts.ECharts | null = null

  get selectedOa() {
    return this.getDatasetAsOa(this.selectedDatasetIndex)
  }

  get selectedOaSelectedVersionId() {
    if (!this.oaVersionIds) {
      return null
    }

    return this.oaVersionIds[this.selectedDatasetIndex]
  }

  @Watch('value.datasets')
  @Watch('oaVersionIds')
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

  @Watch('selectedOa.idObjectOfAnalysisPk')
  @Watch('showObjectOfAnalysisInfo')
  async resizeChartOnSelectOa() {
    await this.$nextTick()
    this.echart && this.echart.resize()
  }

  async mounted() {
    this.initEChart()
    await this.populateData()
  }

  selectVersion(id: number) {
    if (!this.oaVersionIds) {
      return
    }

    this.$set(this.oaVersionIds, this.selectedDatasetIndex, id)
  }

  getDatasetAsOa(index: number) {
    if (!this.value) {
      return
    }

    const dataset: WithDataset = this.value.datasets[index]

    if (dataset instanceof ObjectOfAnalysis) {
      return dataset as ObjectOfAnalysis
    } else {
      return new ObjectOfAnalysis()
    }
  }

  async populateData() {
    if (!this.value || !this.oaVersionIds) {
      return
    }

    await this.allTransformationTypes.query()
    await this.allValueTypes.query()
    await this.allChartTypes.query()
    this.value.chartType = this.allChartTypes.items[0]

    if (!this.value.$id) {
      if (this.savedChartId) {
        await this.value.find(this.savedChartId)
      } else if (this.objectOfAnalysisIds && this.objectOfAnalysisIds.length) {
        for (const id of this.objectOfAnalysisIds) {
          if (id) {
            const oa = new ObjectOfAnalysis()
            await oa.find(id)
            this.value.datasets.push(oa)
          }
        }
      }
    }

    const diff = this.value.datasets.length - this.oaVersionIds.length

    for (let i = this.oaVersionIds.length; i < diff; i++) {
      const oa = this.getDatasetAsOa(i)
      if (oa) {
        this.oaVersionIds.push(oa.idObjectOfAnalysisPk as number)
      }
    }
  }

  transformDatasets() {
    if (!this.value || !this.value.datasets || !this.value.datasets.length) {
      return
    }

    const map: ChartDataset = {}

    this.value.datasets.forEach((item: WithDataset, index: number) => {
      if (!this.oaVersionIds) {
        return
      }

      const idVersion = this.oaVersionIds[this.selectedDatasetIndex]
      const dataset = item.$dataset(idVersion)

      if (!item || !dataset || !dataset.oaDataList) {
        return
      }

      dataset.oaDataList.forEach((data: OaData) => {
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
}
