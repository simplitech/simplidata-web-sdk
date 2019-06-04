const template = `
  <div class="horiz items-left-center">

    <select-group v-if="showChartTypeControl"
      class="topbar-screen w-130 mr-40 my-5"
      :label="$t('view.chart.chartAs')"
      v-model="value.chartType"
      :items="allChartTypes.items"/>
      
    <div v-if="showPeriodicityControl && oasHasDifferentPeriodicities && !value.periodicityTransformation"
      class="periodicity-warning topbar-screen w-10 h-10 mr-5"></div>
    
    <div v-if="showPeriodicityControl" @click="changingPeriodicity = true" class="topbar-screen selectGroup verti mr-40">
      <span class="label">{{ $t('view.chart.periodicity') }}</span>
      <div class="horiz items-left-center">
        <span class="value weight-1 mr-10">
          {{ value.periodicity ? value.periodicity.$tag : '' }}
        </span>
        <div class="chevron w-8 h-5"></div>
      </div>
    </div>
    
    <input-date
      v-if="showDateNavigator"
      v-model="value.startDtLimiter"
      class="topbar-screen w-190 mr-10"
      :placeholder="$t('view.chart.start')"/>
    
    <input-date
      v-if="showDateNavigator"
      v-model="value.endDtLimiter"
      class="topbar-screen w-190"
      :placeholder="$t('view.chart.end')"/>
      
    <div v-if="showLegend" class="legend p-5 horiz items-left-center">
      <a v-for="(itemRfu, i) in value.itensRFU" :key="i" @click="$emit('legendClick', i)" class="item horiz items-left-center mr-10">
        <div class="circle w-10 h-10 mr-3" :style="{ 'background-color': value.getColorByIndex(i) }"></div>
        <div class="weight-1">
          {{ itemRfu.contentTitleWithTransformation }}
        </div>
      </a>
    </div>
      
    <div class="weight-1"></div>

    <button v-if="showAdvancedAnalysisButton && value.chartData" @click="$emit('advancedClick')" class="topbar-screen btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
    
    <div v-if="changingPeriodicity" class="verti fixed top-0 left-0 w-window h-window p-20 darkerscrim z-scrim">
      <a @click="changingPeriodicity = false" class="close w-20 h-20 self-right"></a>
      <h1 class="self-center">{{ $t('view.chart.changePeriodicity') }}</h1>
      <periodicity-transformation-editor
        :title="$t('view.periodicityMismatch.titleDescritive')"
        :allOarfu="allOarfu"
        :generalPeriodicity="value.periodicity"
        :selectedPeriodicityTransformation="value.periodicityTransformation"
        @changeGeneralPeriodicity="changeGeneralPeriodicity"
        @changeAllPeriodicityTransformations="changeAllPeriodicityTransformations"/>
    </div>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import {
  UserSavedChart,
  ChartType,
  ObjectOfAnalysisRFU,
  OaPeriodicity,
  PeriodicityTransformationType,
} from '../../models'
import { Collection } from '../../simpli'
import { SelectGroup } from '../SelectGroup'
import { InputDate } from '../InputDate'
import { PeriodicityTransformationEditor } from '../PeriodicityTransformationEditor'

@Component({
  template,
  components: { SelectGroup, InputDate, PeriodicityTransformationEditor },
})
export default class TopBar extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value!: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showChartTypeControl?: boolean

  @Prop({ type: Boolean, default: true })
  showDateNavigator?: boolean

  @Prop({ type: Boolean, default: false })
  showPeriodicityControl!: boolean

  @Prop({ type: Boolean, default: true })
  showLegend?: boolean

  @Prop({ type: Boolean, default: false })
  showAdvancedAnalysisButton?: boolean

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  allChartTypes = new Collection<ChartType>(ChartType)
  changingPeriodicity = false

  async mounted() {
    await this.populateData()
  }

  async populateData() {
    await this.allChartTypes.query()
    this.value.chartType = this.allChartTypes.items[0]
  }

  get allOarfu(): ObjectOfAnalysisRFU[] {
    return this.value.itensRFU.filter(i => i.$name === 'ObjectOfAnalysisRFU').map(irfu => irfu as ObjectOfAnalysisRFU)
  }

  get oasHasDifferentPeriodicities() {
    let firstPId: number | null = null

    return this.allOarfu.some(oarfu => {
      if (oarfu && oarfu.objectOfAnalysis && oarfu.objectOfAnalysis.periodicity) {
        const pId = oarfu.objectOfAnalysis.periodicity.idOaPeriodicityPk as number
        if (firstPId !== null && firstPId !== pId) {
          return true
        }
        firstPId = pId
      }

      return false
    })
  }

  changeGeneralPeriodicity(periodicity: OaPeriodicity) {
    this.value.periodicity = periodicity
  }

  changeAllPeriodicityTransformations(periodicityTransformation: PeriodicityTransformationType) {
    this.allOarfu.forEach(oarfu => {
      oarfu.periodicityTransformationType = periodicityTransformation
    })

    this.value.periodicityTransformation = periodicityTransformation
  }
}
