const template = `
  <div class="simplidata-chart verti">

    <div class="horiz weight-1">

      <!-- TOOL BUTTONS ON THE LEFT -->
      <tool-buttons v-model="value" 
        :showSaveButton="showSaveButton" :showDrawingButtons="showDrawingButtons && !chartTypeTableSelected"
        :showMeasureButton="showMeasureButton" :showCalcButton="showCalcButton"
        :showCommentButton="showCommentButton"
        @userSavedChart="$emit('userSavedChart')"
        @selectedDrawingTool="selectedDrawingTool"
        class="mt-60"/>

      <div class="verti weight-1 scroll mx-5">

        <!-- SELECTS AND BUTTONS ON TOP BAR -->
        <top-bar v-model="value"
          :showChartTypeControl="showChartTypeControl"
          :showDateNavigator="showDateNavigator"
          :showLegend="showLegend"
          :showAdvancedAnalysisButton="showAdvancedAnalysisButton"
          :selectedDatasetIndex="selectedDatasetIndex"
          @onAdvancedClick="$emit('onAdvancedClick')"/>

        <!-- CHART -->
        <e-chart v-model="value" 
          v-show="!chartTypeTableSelected"
          :graphicBeingBuilt="graphicBeingBuilt"
          @doneEditingGraphic="doneEditingGraphic"
          ref="echart" class="min-h-400 weight-1"/>
          
        <table-chart v-model="value" 
          v-if="chartTypeTableSelected"
          class="min-h-400 weight-1"/>

        <graphic-editor v-model="value" v-if="graphicBeingBuilt"
          :graphicBeingBuilt="graphicBeingBuilt"
          @doneEditingGraphic="doneEditingGraphic"
          @cancelEditing="cancelEditingDrawing"/>
           
      </div>

      <!-- RIGHTPANEL -->
      <right-panel 
        v-if="selectedOaRfu && selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk && showObjectOfAnalysisInfo"
        v-model="value"
        :selectedOaRfu="selectedOaRfu"
        :selectedDatasetIndexOrTheOnly="selectedDatasetIndexOrTheOnly"
        :showTransformationControl="showTransformationControl"
        :showVisitButton="showVisitButton"
        class="w-300"/>

    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { ObjectOfAnalysis, UserSavedChart, ItemRFU, ObjectOfAnalysisRFU, ChartType, ChartGraphic } from '../../models'
import ToolButtons from './ToolButtons'
import TopBar from './TopBar'
import EChart from './EChart'
import TableChart from './TableChart'
import RightPanel from './RightPanel'
import GraphicEditor from './GraphicEditor'

@Component({
  template,
  components: { ToolButtons, TopBar, EChart, TableChart, RightPanel, GraphicEditor },
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

  graphicBeingBuilt: ChartGraphic | null = null

  get selectedOaRfu() {
    return this.getRfuAsOaRfu(this.selectedDatasetIndexOrTheOnly)
  }

  get selectedDatasetIndexOrTheOnly(): number {
    return this.value && this.value.itensRFU.length === 1 ? 0 : this.selectedDatasetIndex || 0
  }

  get chartTypeTableSelected() {
    return this.value && this.value.idChartTypeFk === ChartType.TABLE
  }

  @Watch('selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk')
  @Watch('showObjectOfAnalysisInfo')
  @Watch('value.idChartTypeFk')
  async refreshChartOnSelectOa() {
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

  @Watch('objectOfAnalysisIds')
  async populateData() {
    if (!this.value || !this.value.oaVersionIds) {
      return
    }

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

  doneEditingGraphic() {
    if (this.graphicBeingBuilt) {
      if (this.value) {
        this.value.graphics.push(this.graphicBeingBuilt)
      }
      this.graphicBeingBuilt = this.graphicBeingBuilt.cleanCopy()
    }
  }

  cancelEditingDrawing() {
    this.graphicBeingBuilt = null
  }

  selectedDrawingTool(drawingTool: ChartGraphic) {
    this.graphicBeingBuilt = drawingTool
  }
}
