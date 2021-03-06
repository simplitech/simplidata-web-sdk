const template = `
  <div class="rightpanel horiz auto-scroll">
  
    <a class="collapse rightpanel-screen w-8 h-20 self-center m-5 mr-15"
      @click="toggleCollapse" :class="{ collapsed }"></a>
  
    <div class="panelcontent verti weight-1" :class="{ collapsed }">

      <h1 class="mb-10" :style="{ color: value.getColorByIndex(selectedDatasetIndexOrTheOnly) }">{{ selectedOaRfu.contentTitle }}</h1>
  
      <div class="description mb-20">{{ selectedOaRfu.objectOfAnalysis.comment }}</div>
  
      <!-- TRANSFORMATIONS EDITOR -->
      <transformations-editor v-if="showTransformationControl" v-model="value" 
        :selectedOaRfu="selectedOaRfu" class="mb-30"/>
  
      <!-- INFOS -->
      <div class="verti">
        <div class="horiz mb-10">
          <div class="label weight-1">{{ $t('view.chart.periodicity') }}</div>
          <div class="value">{{ selectedOaRfu.objectOfAnalysis.periodicity.$tag }}</div>
        </div>
  
        <div class="horiz mb-10">
          <div class="label weight-1">{{ $t('view.chart.unity') }}</div>
          <div class="value">{{ selectedOaRfu.objectOfAnalysis.unity.$tag }}</div>
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
      
      <div v-if="showColorControl" class="rightpanel-screen horiz mb-30 items-center">
        <div class="colorLabel mr-10">{{ $t('view.chart.changeColor') }}</div>
        <div class="chart-button w-30 h-30 p-4">
          <input type="color" v-model="oaColor" class="w-full h-full colorpicker"/>
        </div>
      </div>
  
      <!-- VERSION CHOOSER -->
      <version-chooser v-model="value" v-if="showOaVersionControl && moreThanOneVersion"
        :selectedOaRfu="selectedOaRfu" :selectedDatasetIndexOrTheOnly="selectedDatasetIndexOrTheOnly"
        class="rightpanel-screen"/>
      
      <div class="weight-1"></div>
      
      <button v-if="showVisitButton" @click="$emit('visitClick')"
      class="rightpanel-screen self-center btn basic mb-20">{{ $t('view.chart.accessAnalysis') }}</button>
      
    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, ObjectOfAnalysisRFU } from '../../models'
import TransformationsEditor from './TransformationsEditor'
import VersionChooser from './VersionChooser'
import { sleep } from '../../simpli'

@Component({
  template,
  components: { TransformationsEditor, VersionChooser },
})
export default class RightPanel extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value!: UserSavedChart

  @Prop({ type: Object, default: () => new ObjectOfAnalysisRFU() })
  selectedOaRfu!: ObjectOfAnalysisRFU

  @Prop({ type: Number, default: 0 })
  selectedDatasetIndexOrTheOnly?: number

  @Prop({ type: Boolean, default: true })
  showTransformationControl?: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton?: boolean

  @Prop({ type: Boolean, default: false })
  showOaVersionControl?: boolean

  @Prop({ type: Boolean, default: false })
  showColorControl!: boolean

  collapsed = false

  async toggleCollapse() {
    this.collapsed = !this.collapsed
    await sleep(500)
    this.$emit('collapseChange', this.collapsed)
  }

  @Watch('selectedDatasetIndexOrTheOnly')
  async uncollapse() {
    this.collapsed = false
    await sleep(500)
    this.$emit('collapseChange', this.collapsed)
  }

  get oaColor() {
    return this.value.getColor(this.selectedOaRfu.contentTitleWithTransformation)
  }

  set oaColor(val: string) {
    this.value.setColor(this.selectedOaRfu.contentTitleWithTransformation, val)
  }

  get moreThanOneVersion() {
    return this.selectedOaRfu.objectOfAnalysis && this.selectedOaRfu.objectOfAnalysis.oaVersions.length > 1
  }
}
