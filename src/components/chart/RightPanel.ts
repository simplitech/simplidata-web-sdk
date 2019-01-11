const template = `
  <div class="rightpanel verti pl-30">

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
    <version-chooser v-model="value" 
      :selectedOaRfu="selectedOaRfu" :selectedDatasetIndexOrTheOnly="selectedDatasetIndexOrTheOnly"/>
    
    <div class="weight-1"></div>
    
    <button v-if="showVisitButton" @click="$emit('onVisitClick')"
    class="self-center btn basic mb-20">{{ $t('view.chart.accessAnalysis') }}</button>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, ObjectOfAnalysisRFU } from '../../models'
import { colors } from '../../const/colors.const'
import TransformationsEditor from './TransformationsEditor'
import VersionChooser from './VersionChooser'

@Component({
  template,
  components: { TransformationsEditor, VersionChooser },
})
export default class RightPanel extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object, default: () => new ObjectOfAnalysisRFU() })
  selectedOaRfu?: ObjectOfAnalysisRFU

  @Prop({ type: Number, default: 0 })
  selectedDatasetIndexOrTheOnly?: number

  @Prop({ type: Boolean, default: true })
  showTransformationControl?: boolean

  @Prop({ type: Boolean, default: true })
  showVisitButton?: boolean

  colors = colors
}
