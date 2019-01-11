const template = `
  <div class="simplidata-chart verti">

    <div class="horiz weight-1">

      <!-- TOOL BUTTONS ON THE LEFT -->
      <tool-buttons v-model="value" 
        :showSaveButton="showSaveButton" :showDrawingButtons="showDrawingButtons"
        :showMeasureButton="showMeasureButton" :showCalcButton="showCalcButton"
        :showCommentButton="showCommentButton"
        @userSavedChart="$emit('userSavedChart')"
        class="mt-60"/>

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
        <e-chart v-model="value" ref="echart" class="min-h-400 weight-1"/>

      </div>

      <!-- RIGHTPANEL -->
      <div v-if="selectedOaRfu && selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk && showObjectOfAnalysisInfo"
        class="rightpanel verti w-300 pl-30">

        <h1 class="mb-10" :style="{ color: colors[selectedDatasetIndexOrTheOnly] }">{{ selectedOaRfu.$contentTitle }}</h1>

        <div class="description mb-20">{{ selectedOaRfu.objectOfAnalysis.comment }}</div>

        <!-- TRANSFORMATIONS EDITOR -->
        <transformations-editor v-if="showTransformationControl" v-model="value" 
          :selectedOaRfu="selectedOaRfu" class="mb-30"/>

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

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { ObjectOfAnalysis, UserSavedChart, ItemRFU, ObjectOfAnalysisRFU } from '../../models'
import ToolButtons from './ToolButtons'
import TopBar from './TopBar'
import EChart from './EChart'
import TransformationsEditor from './TransformationsEditor'
import { colors } from '../../const/colors.const'

@Component({
  template,
  components: { ToolButtons, TopBar, EChart, TransformationsEditor },
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

  colors = colors

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

  @Watch('selectedOaRfu.objectOfAnalysis.idObjectOfAnalysisPk')
  @Watch('showObjectOfAnalysisInfo')
  async resizeChartOnSelectOa() {
    // @ts-ignore
    const echart = this.$refs.echart as EChart

    await this.$nextTick()
    echart.resize()
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
}
