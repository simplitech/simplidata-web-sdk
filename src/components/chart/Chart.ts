const template = `
  <div class="simplidata-chart verti">

    <div class="horiz weight-1">

      <!-- TOOL BUTTONS ON THE LEFT -->
      <tool-buttons v-model="value" 
        :showSaveButton="showSaveButton" :showDrawingButtons="showDrawingButtons"
        :showMeasureButton="showMeasureButton" :showCalcButton="showCalcButton"
        :showCommentButton="showCommentButton"
        @userSavedChart="$emit('userSavedChart')"/>

      <div class="verti weight-1 mx-5">

        <!-- SELECTS AND BUTTONS ON TOP BAR -->
        <top-bar v-model="value"
          :showChartTypeControl="showChartTypeControl"
          :showDateNavigator="showDateNavigator"
          :showLegend="showLegend"
          :showAdvancedAnalysisButton="showAdvancedAnalysisButton"
          :selectedDatasetIndex="selectedDatasetIndex"
          @onAdvancedClick="$emit('onAdvancedClick')"/>

        <!-- CHART -->
        <div id="echart" ref="echart" class="weight-1 min-h-400"></div>

      </div>

      <!-- RIGHTPANEL -->
      <div v-if="selectedOaRfu && selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk && showObjectOfAnalysisInfo"
        class="rightpanel verti w-300 pl-30">

        <h1 class="mb-10" :style="{ color: colors[selectedDatasetIndexOrTheOnly] }">{{ selectedOaRfu.$contentTitle }}</h1>

        <div class="description mb-20">{{ selectedOaRfu.objectOfAnalysis.comment }}</div>

        <!-- TRANSFORMATION -->
        <div v-if="showTransformationControl" class="transformations mb-30 py-10 verti">
        
          <div class="horiz items-center">
            <div class="transformationTitle weight-1">{{ $t('view.chart.transformation') }}</div>
            <a class="addTransformation" v-popover="{ name: 'sg-tc' + _uid }">{{ $t('view.chart.add') }}</a>
          </div>
          
          <transition name="fade-down" mode="out-in">
            <popover :name="'sg-tc' + _uid" ref="popover">
              <div v-for="t in allTransformationTypes.items"
              :key="t.idTransformationTypePk"
              class="liTC px-15 py-10"
              @click="addTransformation(t)">
               {{ t.title }}
              </div>
            </popover>
          </transition>
          
          <div class="horiz items-left-center">
            <div v-for="(t, i) in selectedOaRfu.orderedTransformations" :key="i.idTransformationTypePk"
                 class="transformationItem h-25 horiz items-left-center pl-10 pr-10 m-5">
              <div class="weight-1 mr-10">
                 {{ t.titleWithCombiner }}
              </div>
              <a class="removeTransformation w-8 h-8" @click="removeTransformation(i)"></a>
            </div>
          </div>
          
        </div>

        <!-- INFOS -->
        <div class="verti">
          <div class="horiz mb-10">
            <div class="label weight-1">{{ $t('view.chart.periodicity') }}</div>
            <div class="value">{{ selectedOaRfu.objectOfAnalysis.periodicity.title }}</div>
          </div>
  
          <div class="horiz mb-10">
            <div class="label weight-1">{{ $t('view.chart.unity') }}</div>
            <div class="value">{{ selectedOaRfu.objectOfAnalysis.unity.title }}</div>
          </div>
  
          <div class="horiz mb-10">
            <div class="label weight-1">{{ $t('view.chart.source') }}</div>
            <div class="value">{{ selectedOaRfu.objectOfAnalysis.source.title }}</div>
          </div>
  
          <div class="horiz mb-30">
            <div class="label weight-1">{{ $t('view.chart.lastUpdate') }}</div>
            <div class="value">{{ selectedOaRfu.objectOfAnalysis.lastUpdate | moment($t('dateFormat.datesimple')) }}</div>
          </div>
        </div>

        <!-- VERSION CHOOSER -->
        <div v-if="showOaVersionControl"
          v-for="version in selectedOaRfu.objectOfAnalysis.oaVersions"
          :key="version.idOaVersionPk"
          class="version horiz items-center mb-9 pl-30"
          :class="{ selected: version.idOaVersionPk === selectedOaSelectedVersionId }"
          @click="selectVersion(version.idOaVersionPk)">
          <div class="weight-1">{{ version.title }}</div>
          <div class="weight-1 text-center">
            {{ version.lastDataset.creationDate | moment($t('dateFormat.datesimple')) }}
          </div>
          <div class="weight-1 text-right">{{ version.oaVersionStatus.title }}</div>
        </div>
        
        <div class="weight-1"></div>
        
        <button v-if="showVisitButton" @click="$emit('onVisitClick')"
        class="self-center btn basic mb-20">{{ $t('view.chart.accessAnalysis') }}</button>

      </div>

    </div>
    
    <!-- CHOOSE TRANSFORMATION MODAL -->
    <div v-if="transformationToChooseCombiner" class="darkerscrim fixed top-0 left-0 w-window z-scrim items-center">
      <div class="pt-20 verti items-center max-w-600 h-window">
        <a @click="transformationToChooseCombiner = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.chooseTheOaToCombineInTheTransformation') }}</h1>
        <input v-model="queryCombiner" @input="debounceSearchCombiner" type="text" class="searchCombiner w-full" :placeholder="$t('view.chart.search')"/>
        <await name="searchCombinerResult" class="weight-1 y-scroll horiz mt-20">
          <a v-for="oa in searchCombinerResult.items" @click="$await.run(() => addCombiner(oa), 'searchCombinerResult')" class="m-5">
            <thumb-oa :oa="oa" :showPlus="false" :showDownload="false" style="width: 280px"/>
          </a>
        </await>
      </div>
    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import moment from 'moment'
import echarts from 'echarts'
import { debounce } from 'lodash'
import { Popover } from 'vue-js-popover'
import { TransformationType, ObjectOfAnalysis, UserSavedChart, ItemRFU, ObjectOfAnalysisRFU } from '../../models'
import { Collection } from '../../simpli'
import ToolButtons from './ToolButtons'
import TopBar from './TopBar'
import { colors } from '../../const/colors.const'

@Component({
  template,
  components: { ToolButtons, TopBar },
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

  @Prop({ type: Boolean, default: false })
  showAdvancedAnalysisButton?: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton?: boolean

  @Prop({ type: Boolean, default: true })
  showDateNavigator?: boolean

  @Prop({ type: Boolean, default: true })
  showLegend?: boolean

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  readonly DEBOUNCE_TIMER = 300

  allTransformationTypes = new Collection(TransformationType)

  colors = colors
  transformationToChooseCombiner: TransformationType | null = null
  queryCombiner: string | null = null
  searchCombinerResult = new Collection(ObjectOfAnalysis)
  debounceSearchCombiner = debounce(async () => await this.searchCombiner(), this.DEBOUNCE_TIMER)

  echart: echarts.ECharts | null = null

  get selectedOaRfu() {
    return this.getRfuAsOaRfu(this.selectedDatasetIndexOrTheOnly)
  }

  get selectedOaSelectedVersionId() {
    if (!this.value || !this.value.oaVersionIds) {
      return null
    }

    return this.value.oaVersionIds[this.selectedDatasetIndexOrTheOnly]
  }

  get selectedDatasetIndexOrTheOnly(): number {
    return this.value && this.value.itensRFU.length === 1 ? 0 : this.selectedDatasetIndex || 0
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

  @Watch('selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk')
  @Watch('showObjectOfAnalysisInfo')
  async resizeChartOnSelectOa() {
    await this.$nextTick()
    this.echart && this.echart.resize()
  }

  @Watch('selectedOaRfu.orderedTransformations')
  @Watch('value.oaVersionIds')
  @Watch('value.startDtLimiter')
  @Watch('value.endDtLimiter')
  refreshDataListRFU() {
    if (!this.value) {
      return
    }

    this.value.itensRFU.forEach((irfu, i) => {
      if (irfu && irfu instanceof ObjectOfAnalysisRFU) {
        const oarfu = irfu as ObjectOfAnalysisRFU
        if (oarfu.objectOfAnalysis && this.value && this.value.oaVersionIds) {
          oarfu.oaVersion = oarfu.objectOfAnalysis.getVersionById(this.value.oaVersionIds[i])
          if (this.value) {
            oarfu.refreshDataListRFU(this.value.startDtLimiter, this.value.endDtLimiter)
          }
        }
      }
    })
  }

  async mounted() {
    this.initEChart()
    await this.populateData()
  }

  selectVersion(id: number) {
    if (!this.value || !this.value.oaVersionIds || !this.selectedDatasetIndexOrTheOnly) {
      return
    }

    this.$set(this.value.oaVersionIds, this.selectedDatasetIndexOrTheOnly, id)
  }

  getRfuAsOaRfu(index?: number) {
    if (index === undefined || !this.value) {
      return null
    }

    const itemRfu: ItemRFU = this.value.itensRFU[index]

    if (itemRfu && itemRfu instanceof ObjectOfAnalysisRFU) {
      const oaRfu = itemRfu as ObjectOfAnalysisRFU
      if (oaRfu) {
        return oaRfu
      }
    }

    return null
  }

  async populateData() {
    if (!this.value || !this.value.oaVersionIds) {
      return
    }

    await this.allTransformationTypes.query()

    if (!this.value.idUserChartPk) {
      if (this.savedChartId) {
        await this.value.find(this.savedChartId)
        this.value.parseJson()
      } else if (this.objectOfAnalysisIds && this.objectOfAnalysisIds.length) {
        for (const i in this.objectOfAnalysisIds) {
          const oaId = this.objectOfAnalysisIds[i]
          if (oaId) {
            const oa = new ObjectOfAnalysis()
            await oa.find(oaId)
            const version = oa.getVersionById(this.value.oaVersionIds[i])
            this.value.itensRFU.push(
              new ObjectOfAnalysisRFU(oa, version, this.value.startDtLimiter, this.value.endDtLimiter)
            )
          }
        }
      }
    }

    const diff = this.value.itensRFU.length - this.value.oaVersionIds.length

    for (let i = this.value.oaVersionIds.length; i < diff; i++) {
      const oarfu = this.getRfuAsOaRfu(i)
      if (oarfu && oarfu.objectOfAnalysis && oarfu.objectOfAnalysis.oaVersions.length) {
        this.value.oaVersionIds.push(oarfu.objectOfAnalysis.oaVersions[0].idOaVersionPk as number)
      } else {
        this.value.oaVersionIds.push(0)
      }
    }

    this.$emit('dataLoaded')
  }

  addTransformation(transformation: TransformationType) {
    // @ts-ignore
    const component = this.$refs.popover as Popover
    component.visible = false

    if (transformation.combiner && !transformation.combineWith) {
      this.transformationToChooseCombiner = Object.assign(transformation, {})
      return
    }

    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.push(transformation)
    }
  }

  async addCombiner(oa: ObjectOfAnalysis) {
    await oa.find(oa.idObjectOfAnalysisPk)
    if (!this.transformationToChooseCombiner || !oa.oaVersions.length || !oa.oaVersions[0].lastDataset) {
      return
    }

    this.transformationToChooseCombiner.combineWith = new ObjectOfAnalysisRFU(oa, oa.oaVersions[0])
    this.addTransformation(this.transformationToChooseCombiner)
    this.transformationToChooseCombiner = null
  }

  removeTransformation(index: number) {
    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.splice(index, 1)
    }
  }

  async searchCombiner() {
    if (!this.queryCombiner || !this.queryCombiner.length) {
      this.searchCombinerResult.items = []
    } else {
      await this.searchCombinerResult.query({ query: this.queryCombiner }, 'searchCombinerResult')
    }
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

    console.log(this.startIndexLimiter)
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
