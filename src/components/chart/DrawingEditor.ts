const template = `
  <div class="relative w-full">
    <div class="drawing-editor horiz w-full p-7 bottom-0 items-center">
      
      <input
        v-model="textOfGraphic"
        v-if="hasTextOfGraphic"
        type="text"
        class="w-190"
        ref="textField"
        :placeholder="$t('view.chart.text')"/>
        
      <div class="weight-1"></div>
      
      <a class="cancel-btn w-50 h-30"
        @click="$emit('cancelEditing')"></a>
      <a class="ok-btn w-50 h-30" 
         :class="{ 'opacity-20': !graphicBeingBuilt.$isValidToSave }"
         @click="$emit('doneEditing')"></a>
        
    </div>
  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, ChartGraphic, TextChartGraphic } from '../../models'

@Component({
  template,
})
export default class DrawingEditor extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object })
  graphicBeingBuilt?: ChartGraphic

  get hasTextOfGraphic() {
    return this.graphicBeingBuilt && this.graphicBeingBuilt.$name === 'TextChartGraphic'
  }

  get textOfGraphic() {
    if (!this.hasTextOfGraphic) {
      return null
    }

    return (this.graphicBeingBuilt as TextChartGraphic).text
  }

  set textOfGraphic(val) {
    if (!this.hasTextOfGraphic) {
      return
    }

    const tcg = this.graphicBeingBuilt as TextChartGraphic

    if (tcg) {
      tcg.text = val ? val : ''
    }
  }

  @Watch('hasTextOfGraphic')
  focusIfHasText() {
    if (this.hasTextOfGraphic) {
      const el = this.$refs.textField as HTMLInputElement
      el.focus()
    }
  }

  mounted() {
    this.focusIfHasText()
  }
}
