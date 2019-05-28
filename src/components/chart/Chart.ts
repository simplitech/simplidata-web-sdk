const template = `
  <div class="simplidata-chart verti min-h-450">

    <div class="horiz weight-1">

      <!-- TOOL BUTTONS ON THE LEFT -->
      <tool-buttons v-model="value"
        :drawingState="drawingState"
        :showSaveButton="showSaveButton" :showDrawingButtons="showDrawingButtons && !chartTypeTableSelected"
        :showMeasureButton="showMeasureButton" :showCalcButton="showCalcButton"
        :showCommentButton="showCommentButton"
        @userSavedChart="$emit('userSavedChart', $event)"
        class="mt-60"/>

      <div class="verti weight-1 auto-scroll mx-5">

        <!-- SELECTS AND BUTTONS ON TOP BAR -->
        <top-bar v-model="value"
          :showChartTypeControl="showChartTypeControl"
          :showDateNavigator="showDateNavigator"
          :showLegend="showLegend"
          :showAdvancedAnalysisButton="alreadyShowAdvancedAnalysisButton"
          :selectedDatasetIndex="selectedDatasetIndex"
          @advancedClick="$emit('advancedClick')"
          @legendClick="onLegendClick"/>

        <!-- CHART -->
        <e-chart v-model="value" 
          v-show="!chartTypeTableSelected"
          :drawingState="drawingState"
          :showDrawingButtons="showDrawingButtons"
          ref="echart" class="min-h-400 weight-1"/>
          
        <table-chart v-model="value" 
          v-if="chartTypeTableSelected"
          class="min-h-400 weight-1"/>
           
      </div>

      <!-- RIGHTPANEL -->
      <right-panel 
        v-if="selectedOaRfu && selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk && showObjectOfAnalysisInfo"
        v-model="value"
        :selectedOaRfu="selectedOaRfu"
        :selectedDatasetIndexOrTheOnly="selectedDatasetIndexOrTheOnly"
        :showTransformationControl="showTransformationControl"
        :showVisitButton="showVisitButton"
        :showOaVersionControl="showOaVersionControl"
        @visitClick="$emit('visitClick')"
        @collapseChange="refresh"
        :class="{ 'h-full': !dynamicHeight }"/>

    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { ObjectOfAnalysis, UserSavedChart, ItemRFU, ObjectOfAnalysisRFU, ChartType } from '../../models'
import { colors } from '../../const/colors.const'
import ToolButtons from './ToolButtons'
import TopBar from './TopBar'
import EChart from './EChart'
import TableChart from './TableChart'
import RightPanel from './RightPanel'
import { DrawingState } from './DrawingState'
import { ID } from '../../simpli'

@Component({
  template,
  components: { ToolButtons, TopBar, EChart, TableChart, RightPanel },
})
export class Chart extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value!: UserSavedChart

  @Prop({ type: [String, Number] })
  savedChartId?: ID

  @Prop({ type: Array })
  objectOfAnalysisIds?: number[]

  @Prop({ type: Boolean, default: true })
  showSaveButton!: boolean

  @Prop({ type: Boolean, default: true })
  showDrawingButtons!: boolean

  @Prop({ type: Boolean, default: true })
  showMeasureButton!: boolean

  @Prop({ type: Boolean, default: true })
  showCalcButton!: boolean

  @Prop({ type: Boolean, default: true })
  showCommentButton!: boolean

  @Prop({ type: Boolean, default: true })
  showChartTypeControl!: boolean

  @Prop({ type: Boolean, default: true })
  showObjectOfAnalysisInfo!: boolean

  @Prop({ type: Boolean, default: true })
  showTransformationControl!: boolean

  @Prop({ type: Boolean, default: false })
  showOaVersionControl!: boolean

  @Prop({ type: Boolean, default: false })
  showAdvancedAnalysisButton!: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton!: boolean

  @Prop({ type: Boolean, default: true })
  showDateNavigator!: boolean

  @Prop({ type: Boolean, default: true })
  showLegend!: boolean

  @Prop({ type: Boolean, default: false })
  dynamicHeight!: boolean

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  @Prop({ type: Array, default: () => colors })
  colors!: string[]

  drawingState = new DrawingState(this.value)
  dataLoaded = false

  get selectedOaRfu() {
    return this.getRfuAsOaRfu(this.selectedDatasetIndexOrTheOnly)
  }

  get selectedDatasetIndexOrTheOnly(): number {
    return this.value.itensRFU.length === 1 ? 0 : this.selectedDatasetIndex || 0
  }

  get chartTypeTableSelected() {
    return this.value.idChartTypeFk === ChartType.TABLE
  }

  get alreadyShowAdvancedAnalysisButton() {
    return this.showAdvancedAnalysisButton && this.dataLoaded
  }

  @Watch('selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk')
  @Watch('showObjectOfAnalysisInfo')
  @Watch('value.idChartTypeFk')
  async refresh() {
    // @ts-ignore
    const echart = this.$refs.echart as EChart

    await this.$nextTick()
    echart.refresh()
  }

  @Watch('selectedOaRfu.orderedTransformations')
  @Watch('value.oaVersionIds')
  @Watch('value.startDtLimiter')
  @Watch('value.endDtLimiter')
  refreshDataListRFU() {
    this.value.itensRFU.forEach((irfu, i) => {
      if (irfu && irfu instanceof ObjectOfAnalysisRFU) {
        const oarfu = irfu as ObjectOfAnalysisRFU
        if (oarfu.objectOfAnalysis && this.value && this.value.oaVersionIds) {
          const newVersion = oarfu.objectOfAnalysis.getVersionById(this.value.oaVersionIds[i])
          if (newVersion) {
            oarfu.oaVersion = newVersion
          }
          if (this.value) {
            oarfu.refreshDataListRFU(this.value.startDtLimiter, this.value.endDtLimiter)
          }
        }
      }
    })
  }

  @Watch('objectOfAnalysisIds')
  async populateData() {
    if (!this.value.oaVersionIds) {
      return
    }

    let somethingLoaded = false

    if (!this.value.idUserChartPk) {
      if (this.savedChartId) {
        somethingLoaded = true
        await this.value.find(this.savedChartId)
        await this.value.parseJson()
      } else if (this.objectOfAnalysisIds && this.objectOfAnalysisIds.length) {
        somethingLoaded = true
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

    this.value.lastSavedJson = this.value.relevantToSave

    if (somethingLoaded) {
      this.dataLoaded = true
      this.$emit('dataLoaded')
    }
  }

  async mounted() {
    await this.populateData()
  }

  getRfuAsOaRfu(index?: number) {
    if (index === undefined) {
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

  onLegendClick(i: number) {
    this.selectedDatasetIndex = i
  }

  @Watch('value.itensRFU')
  datasetsUpdated() {
    this.value.itensRFU.forEach(async itemrfu => this.value.addColorIfUnexist(itemrfu.contentTitleWithTransformation))
  }

  @Watch('colors', { immediate: true })
  updateColors() {
    this.value.availableColors = this.colors
  }
}
