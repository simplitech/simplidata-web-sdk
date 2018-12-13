const template = `
  <div class="simplidata-chart verti">

    <div class="horiz weight-1">

      <div class="verti w-40 mt-60">

        <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
          :title="$t('view.chart.saveChartOnCollection')"></a>

        <popover :name="'sg-save' + _uid" ref="popover">
          <div class="verti">
            <div v-if="myCollections.items.length" class="saved-collections verti mt-20 mx-10">
              <a v-for="c in myCollections.items" @click="persistUserSavedChart(c.idCollectionPk)" class="h-30 line-h-30">
                {{ c.title }}
              </a>
              <div class="divisor my-15"></div>
            </div>
            <a class="new-collection pl-40 pr-10 h-40 line-h-40" @click="openNewCollection">{{ $t('view.chart.newCollection') }}</a>
            <a class="download-collection pl-40 pr-10 h-40 line-h-40" @click="downloadCollectionOpen = true">{{ $t('view.chart.download') }}</a>
          </div>
        </popover>

        <template v-if="showDrawingButtons">
          <a class="chart-line h-40 mb-8 items-center"></a>

          <a class="chart-pencil h-40 mb-8 items-center"></a>

          <a class="chart-text h-40 mb-8 items-center"></a>
        </template>

        <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"></a>

        <a v-if="showCalcButton" class="chart-calc h-40 mb-8 items-center"></a>

        <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"></a>

      </div>

      <div class="verti weight-1 mx-5">

        <div class="horiz">

          <select-group v-if="showChartTypeControl"
            class="w-130 mr-40 my-5"
            :label="$t('view.chart.chartAs')"
            v-model="value.chartType"
            :items="allChartTypes.items"/>
          
          <input
            v-if="showDateNavigator"
            v-model="startStrLimiter"
            type="date"
            class="w-190 mr-10"
            :placeholder="$t('view.chart.start')"/>
          
          <input
            v-if="showDateNavigator"
            v-model="endStrLimiter"
            type="date"
            class="w-190"
            :placeholder="$t('view.chart.end')"/>
            
          <div v-if="showLegend" class="legend p-5 horiz items-left-center">
            <a v-for="(itemRfu, i) in value.itensRFU" :key="i" @click="selectedDatasetIndex = i" class="item horiz items-left-center mr-10">
              <div class="circle w-10 h-10 mr-3" :style="{ 'background-color': colors[i] }"></div>
              <div class="weight-1">
                {{ itemRfu.$contentTitle }}
              </div>
            </a>
          </div>
            
          <div class="weight-1"></div>

          <button v-if="showAdvancedAnalysisButton" @click="$emit('onAdvancedClick')" class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
        </div>

        <div class="weight-1 min-h-400" id="echart" ref="echart"></div>

      </div>

      <div v-if="selectedOaRfu && selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk && showObjectOfAnalysisInfo"
      class="rightpanel verti w-300 pl-30">

        <h1 class="mb-10" :style="{ color: colors[selectedDatasetIndexOrTheOnly] }">{{ selectedOaRfu.objectOfAnalysis.title }}</h1>

        <div class="description mb-20">{{ selectedOaRfu.objectOfAnalysis.comment }}</div>

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
                 {{ t.title }}
              </div>
              <a class="removeTransformation w-8 h-8" @click="removeTransformation(i)"></a>
            </div>
          </div>
          
        </div>

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
    
    <div v-if="newCollection" class="scrim fixed top-0 left-0 w-window h-window items-center">
      <form @submit.prevent="persistCollection" class="popup p-20 w-450 verti items-center">
        <a @click="newCollection = null" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.newCollection') }}</h1>
        <input type="text" v-model="newCollection.title" class="w-300" :placeholder="$t('view.chart.collectionName')"/>
        <button type="submit" class="submit mt-40 w-300 h-50 mb-30">{{ $t('view.chart.save') }}</button>
      </form>
    </div>
    
    <div v-if="downloadCollectionOpen" class="scrim fixed top-0 left-0 w-window h-window items-center">
      <div class="popup p-20 w-450 verti items-center">
        <a @click="downloadCollectionOpen = false" class="close w-20 h-20 self-right"></a>
        <h1 class="mt-0 mb-40">{{ $t('view.chart.contentDownload') }}</h1>
        <a class="squared w-60 h-60 line-h-60 text-center" @click="downloadXls">{{ $t('view.chart.xls') }}</a>
      </div>
    </div>

  </div>
`

import moment from 'moment'
import zipcelx from 'zipcelx'
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import { Popover } from 'vue-js-popover'
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
  OaData,
  ItemRFU,
  ObjectOfAnalysisRFU,
  Collection as SDCollection,
} from '../models'

import { Collection } from 'simpli-web-sdk'
import SelectGroup from './SelectGroup'
import { colors } from '../const/colors.const'

export interface MapOfDateAndValues {
  [key: string]: (number | null | undefined)[]
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

  @Prop({ type: Array, default: () => [] })
  oaVersionIds?: number[]

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  allChartTypes = new Collection<ChartType>(ChartType)
  allTransformationTypes = new Collection(TransformationType)
  myCollections = new Collection(SDCollection)

  colors = colors

  echart: echarts.ECharts | null = null

  newCollection: SDCollection | null = null
  downloadCollectionOpen = false

  get selectedOaRfu() {
    return this.getRfuAsOaRfu(this.selectedDatasetIndexOrTheOnly)
  }

  get selectedOaSelectedVersionId() {
    if (!this.oaVersionIds) {
      return null
    }

    return this.oaVersionIds[this.selectedDatasetIndexOrTheOnly]
  }

  get selectedDatasetIndexOrTheOnly(): number {
    return this.value && this.value.itensRFU.length === 1 ? 0 : this.selectedDatasetIndex || 0
  }

  get chartData() {
    if (!this.value || !this.value.itensRFU || !this.value.itensRFU.length) {
      return
    }

    const map: MapOfDateAndValues = {}

    this.value.itensRFU.forEach((item: ItemRFU, index: number) => {
      if (!this.oaVersionIds) {
        return
      }

      item.dataListRFU.forEach((data: OaData) => {
        const dtFormat: string = this.$t('system.format.date').toString()
        const formattedDate = moment(data.dt).format(dtFormat)

        if (!map[formattedDate]) {
          map[formattedDate] = Array(index).fill(null)
        }

        map[formattedDate].push(data.value)
      })
    })

    const result: any[] = []

    for (const i in map) {
      if (i) {
        const spaceLeft = this.value.itensRFU.length - map[i].length
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

  get startStrLimiter() {
    return this.value ? this.strLimiterFromDt(this.value.startDtLimiter) : null
  }

  set startStrLimiter(val) {
    if (!this.value || !val) {
      return
    }

    const dt = this.dtLimiterFromStr(val)

    if (dt) {
      this.value.startDtLimiter = dt
    }
  }

  get endStrLimiter() {
    return this.value ? this.strLimiterFromDt(this.value.endDtLimiter) : null
  }

  set endStrLimiter(val) {
    if (!this.value || !val) {
      return
    }

    const dt = this.dtLimiterFromStr(val)

    if (dt) {
      this.value.endDtLimiter = dt
    }
  }

  openNewCollection() {
    this.newCollection = new SDCollection()
  }

  @Watch('chartData')
  updateChartData() {
    if (!this.echart || !this.value) {
      return
    }

    const option = {
      ...this.chartOptions, // echarts bug: we need to merge manually instead of merging on setOptions
      dataset: {
        source: this.chartData,
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
  @Watch('oaVersionIds')
  @Watch('value.startDtLimiter')
  @Watch('value.endDtLimiter')
  refreshDataListRFU() {
    if (!this.value) {
      return
    }

    this.value.itensRFU.forEach((irfu, i) => {
      if (irfu && irfu instanceof ObjectOfAnalysisRFU) {
        const oarfu = irfu as ObjectOfAnalysisRFU
        if (oarfu.objectOfAnalysis && this.oaVersionIds) {
          oarfu.oaVersion = oarfu.objectOfAnalysis.getVersionById(this.oaVersionIds[i])
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
    if (!this.oaVersionIds || !this.selectedDatasetIndexOrTheOnly) {
      return
    }

    this.$set(this.oaVersionIds, this.selectedDatasetIndexOrTheOnly, id)
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
    if (!this.value || !this.oaVersionIds) {
      return
    }

    await this.allTransformationTypes.query()
    await this.allChartTypes.query()
    await this.myCollections.query()
    this.value.chartType = this.allChartTypes.items[0]

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
            const version = oa.getVersionById(this.oaVersionIds[i])
            this.value.itensRFU.push(
              new ObjectOfAnalysisRFU(oa, version, this.value.startDtLimiter, this.value.endDtLimiter)
            )
          }
        }
      }
    }

    const diff = this.value.itensRFU.length - this.oaVersionIds.length

    for (let i = this.oaVersionIds.length; i < diff; i++) {
      const oarfu = this.getRfuAsOaRfu(i)
      if (oarfu && oarfu.objectOfAnalysis && oarfu.objectOfAnalysis.oaVersions.length) {
        this.oaVersionIds.push(oarfu.objectOfAnalysis.oaVersions[0].idOaVersionPk as number)
      } else {
        this.oaVersionIds.push(0)
      }
    }

    this.$emit('dataLoaded')
  }

  addTransformation(transformation: TransformationType) {
    // @ts-ignore
    const component = this.$refs.popover as Popover
    component.visible = false
    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.push(transformation)
    }
  }

  removeTransformation(index: number) {
    if (this.selectedOaRfu) {
      this.selectedOaRfu.orderedTransformations.splice(index, 1)
    }
  }

  async persistCollection() {
    if (!this.newCollection || !this.value) {
      return
    }

    const resp = await this.newCollection.save<number>()
    this.newCollection.idCollectionPk = resp.data
    this.myCollections.items.push(this.newCollection)
    this.newCollection = null
    await this.persistUserSavedChart(resp.data)
  }

  async persistUserSavedChart(idCollection: number | null, idDownloadType: number | null = null) {
    if (!this.value) {
      return
    }

    if (idCollection) {
      this.value.idCollectionFk = idCollection
    } else {
      this.value.collection = null
    }

    if (idDownloadType) {
      this.value.idDownloadTypeFk = idDownloadType
    } else {
      this.value.downloadType = null
    }

    this.value.buildJson()
    await this.value.save()
    this.$emit('userSavedChart')
  }

  async downloadXls() {
    if (!this.value || !this.chartData) {
      return
    }

    const data = this.chartData.map(item => {
      return item.map((value: any, i: number) => {
        return {
          value,
          type: i === 0 ? 'string' : 'number',
        }
      })
    })

    const names = this.value.itensRFU.map((itemrfu, i) => {
      return {
        value: itemrfu.$contentTitle,
        type: 'string',
      }
    })

    const filename = this.value.itensRFU.reduce((name, itemrfu) => {
      return name + (name.length ? ' + ' : '') + itemrfu.$contentTitle
    }, '')

    await zipcelx({
      filename,
      sheet: {
        data: [
          [
            {
              value: this.$t('view.chart.date'),
              type: 'string',
            },
            ...names,
          ],
          ...data,
        ],
      },
    })

    await this.persistUserSavedChart(null, 1)
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

  strLimiterFromDt(dt: string | null) {
    return dt ? moment(dt).format('YYYY-MM-DD') : null
  }

  dtLimiterFromStr(dt: string | null) {
    if (!dt) {
      return null
    }

    const dtMoment = moment(dt)

    if (dtMoment.year() < 1000) {
      return null
    }

    return dtMoment.format()
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
          show: true,
          xAxisIndex: [0],
          handleStyle: { opacity: 10 },
          borderColor: 'rgba(0,0,0,0)',
          fillerColor: 'rgba(255,255,255,0.1)',
          height: 10,
        },
        { type: 'inside', show: true, xAxisIndex: [0] },
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
