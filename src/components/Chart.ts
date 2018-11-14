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
          
          <input-text
            v-model="value.startDtLimiter"
            type="datetime"
            class="w-190 mr-10"
            :placeholder="$t('view.chart.start')"/>
          
          <input-text
            v-model="value.endDtLimiter"
            type="datetime"
            class="w-190"
            :placeholder="$t('view.chart.end')"/>
            
          <div class="weight-1"></div>

          <button class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
        </div>

        <div class="weight-1 min-h-400" id="echart" ref="echart"></div>

      </div>

      <div v-if="selectedOa && selectedOa.$id && showObjectOfAnalysisInfo"
      class="rightpanel verti w-300 pl-30">

        <h1 class="mb-10" :style="{ color: colors[selectedDatasetIndexOrTheOnly] }">{{ selectedOa.title }}</h1>

        <div class="description mb-25">{{ selectedOa.comment }}</div>

        <select-group v-if="showTransformationControl"
          class="mb-40"
          :label="$t('view.chart.transformation')"
          :empty="$t('view.chart.none')"
          v-model="value.transformationType"
          :items="allTransformationTypes.items"/>

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

import moment from 'moment'
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import {
  ChartType,
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
import { colors } from '../const/colors.const'

export interface MapOfDateAndValues {
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
  showObjectOfAnalysisInfo?: boolean

  @Prop({ type: Boolean, default: true })
  showTransformationControl?: boolean

  @Prop({ type: Boolean, default: false })
  showOaVersionControl?: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton?: boolean

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Array, default: () => [] })
  oaVersionIds?: number[]

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  allChartTypes = new Collection<ChartType>(ChartType)
  allTransformationTypes = new Collection(TransformationType)

  colors = colors

  echart: echarts.ECharts | null = null

  get selectedOa() {
    return this.getDatasetAsOa(this.selectedDatasetIndexOrTheOnly)
  }

  get selectedOaSelectedVersionId() {
    if (!this.oaVersionIds || !this.selectedDatasetIndexOrTheOnly) {
      return null
    }

    return this.oaVersionIds[this.selectedDatasetIndexOrTheOnly]
  }

  get selectedDatasetIndexOrTheOnly(): number {
    return this.value && this.value.datasetHolders.length === 1 ? 0 : this.selectedDatasetIndex || 0
  }

  get chartData() {
    if (!this.value || !this.value.datasetHolders || !this.value.datasetHolders.length) {
      return
    }

    const map: MapOfDateAndValues = {}

    this.value.datasetHolders.forEach((item: WithDataset, index: number) => {
      if (!this.oaVersionIds) {
        return
      }

      const idVersion = this.oaVersionIds[index || 0]
      const dataset = item.$dataset(idVersion)

      if (!item || !dataset || !dataset.oaDataList) {
        return
      }

      dataset.oaDataList.forEach((data: OaData) => {
        if (!map[data.dt]) {
          map[data.dt] = Array(index).fill(null)
        }

        map[data.dt].push(data.value)
      })
    })

    const result: any[] = []

    for (const i in map) {
      if (i) {
        const spaceLeft = this.value.datasetHolders.length - map[i].length
        result.push([i, ...map[i], ...Array(spaceLeft).fill(null)])
      }
    }

    return result
  }

  get startIndexLimiter() {
    return this.value ? this.indexLimiterFromDt(this.value.startDtLimiter, true) : 0
  }

  set startIndexLimiter(val) {
    if (!this.value || !val) {
      return
    }

    // TODO: talvez precise: this.$set(this.value, 'startDtLimiter',
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

  @Watch('chartData')
  updateChartData() {
    if (!this.echart || !this.value) {
      return
    }

    this.echart.setOption({
      dataset: {
        source: this.chartData,
      },
      series: this.value.datasetHolders.map(d => ({
        type: 'line',
        smooth: true,
      })),
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
    if (!this.oaVersionIds || !this.selectedDatasetIndexOrTheOnly) {
      return
    }

    this.$set(this.oaVersionIds, this.selectedDatasetIndexOrTheOnly, id)
  }

  getDatasetAsOa(index?: number) {
    const defaultResp = new ObjectOfAnalysis()

    if (index === undefined || !this.value) {
      return defaultResp
    }

    const dataset: WithDataset = this.value.datasetHolders[index]

    if (dataset && dataset.$name === 'ObjectOfAnalysis') {
      return dataset as ObjectOfAnalysis
    } else {
      return defaultResp
    }
  }

  async populateData() {
    if (!this.value || !this.oaVersionIds) {
      return
    }

    await this.allTransformationTypes.query()
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
            this.value.datasetHolders.push(oa)
          }
        }
      }
    }

    const diff = this.value.datasetHolders.length - this.oaVersionIds.length

    for (let i = this.oaVersionIds.length; i < diff; i++) {
      const oa = this.getDatasetAsOa(i)
      if (oa && oa.oaVersions.length) {
        this.oaVersionIds.push(oa.oaVersions[0].idOaVersionPk as number)
      } else {
        this.oaVersionIds.push(0)
      }
    }

    this.$emit('dataLoaded')
  }

  indexLimiterFromDt(dt: string | null, after: boolean) {
    if (!this.chartData || !dt) {
      return 0
    }

    const dtMoment = moment(dt)

    const indexedChartData = this.chartData
      .map((c, i) => ({ ind: i, val: c[0] }))
      .filter(c => dtMoment.isSame(c.val) || dtMoment.isAfter(c.val) !== after)

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
    if (this.chartData && this.chartData[index]) {
      return this.chartData[index][0]
    } else {
      return null
    }
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
      color: this.colors,
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
        { type: 'inside', show: true, xAxisIndex: [0] },
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
      if (!this.echart || !this.echart.getModel() || !this.value) {
        return
      }
      const axis = this.echart.getModel().option.xAxis[0]
      this.startIndexLimiter = axis.rangeStart
      this.endIndexLimiter = axis.rangeEnd
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
