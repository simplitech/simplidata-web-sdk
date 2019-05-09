const template = `
  <div class="horiz">

    <select-group v-if="showChartTypeControl"
      class="w-130 mr-40 my-5"
      :label="$t('view.chart.chartAs')"
      v-model="value.chartType"
      :items="allChartTypes.items"/>
    
    <input-date
      v-if="showDateNavigator"
      v-model="value.startDtLimiter"
      class="w-190 mr-10"
      :placeholder="$t('view.chart.start')"/>
    
    <input-date
      v-if="showDateNavigator"
      v-model="value.endDtLimiter"
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
import { UserSavedChart, ChartType } from '../../models'
import { Collection } from '../../simpli'
import { SelectGroup } from '../SelectGroup'
import { InputDate } from '../InputDate'

@Component({
  template,
  components: { SelectGroup, InputDate },
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

  @Prop({ type: Array, required: true })
  colors!: string[]

  allChartTypes = new Collection<ChartType>(ChartType)

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
}
