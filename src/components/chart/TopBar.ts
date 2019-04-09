const template = `
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
      <a v-for="(itemRfu, i) in value.itensRFU" :key="i" @click="$emit('legendClick', i)" class="item horiz items-left-center mr-10">
        <div class="circle w-10 h-10 mr-3" :style="{ 'background-color': colors[i % colors.length] }"></div>
        <div class="weight-1">
          {{ itemRfu.contentTitleWithTransformation }}
        </div>
      </a>
    </div>
      
    <div class="weight-1"></div>

    <button v-if="showAdvancedAnalysisButton && value.chartData" @click="$emit('advancedClick')" class="btn basic">{{ $t('view.chart.advancedAnalysis') }}</button>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import moment from 'moment'
import { UserSavedChart, ChartType } from '../../models'
import { Collection } from '../../simpli'
import { SelectGroup } from '../SelectGroup'
import { colors } from '../../const/colors.const'

@Component({
  template,
  components: { SelectGroup },
})
export default class TopBar extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showChartTypeControl?: boolean

  @Prop({ type: Boolean, default: true })
  showDateNavigator?: boolean

  @Prop({ type: Boolean, default: true })
  showLegend?: boolean

  @Prop({ type: Boolean, default: false })
  showAdvancedAnalysisButton?: boolean

  @Prop({ type: Number })
  selectedDatasetIndex?: number

  allChartTypes = new Collection<ChartType>(ChartType)
  colors = colors

  get startStrLimiter() {
    return this.value ? this.strLimiterFromDt(this.value.startDtLimiter) : null
  }

  set startStrLimiter(val) {
    if (!this.value) {
      return
    }

    if (!val) {
      this.value.startDtLimiter = null
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
    if (!this.value) {
      return
    }

    if (!val) {
      this.value.endDtLimiter = null
    }

    const dt = this.dtLimiterFromStr(val)

    if (dt) {
      this.value.endDtLimiter = dt
    }
  }

  async mounted() {
    await this.populateData()
  }

  async populateData() {
    if (!this.value) {
      return
    }

    await this.allChartTypes.query()
    this.value.chartType = this.allChartTypes.items[0]
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
}
