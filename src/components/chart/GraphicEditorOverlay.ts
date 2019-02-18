import echarts from 'echarts'

const template = `
    <div class="graphic-editor-overlay relative">
        <textarea v-if="editingText" v-model="graphicBeingBuiltAsText.text"
          v-focus class="w-400 p-0" :style="{ top, left }"
          :placeholder="$t('view.chart.typeHere')"></textarea>
    </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, TextChartGraphic, ChartGraphic } from '../../models'

@Component({
  template,
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
})
export default class GraphicEditorOverlay extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object })
  graphicBeingBuilt?: ChartGraphic

  @Prop({ type: Object })
  echart?: echarts.ECharts

  get graphicBeingBuiltAsText() {
    if (!this.graphicBeingBuilt || !(this.graphicBeingBuilt instanceof TextChartGraphic)) {
      return null
    }

    return this.graphicBeingBuilt as TextChartGraphic
  }

  get editingText() {
    return (
      this.graphicBeingBuilt &&
      !this.graphicBeingBuilt.$isDone &&
      !this.graphicBeingBuilt.$isCancelled &&
      this.graphicBeingBuiltAsText &&
      this.graphicBeingBuiltAsText.position !== null
    )
  }

  get left() {
    if (!this.graphicBeingBuiltAsText || !this.graphicBeingBuiltAsText.position || !this.echart) {
      return 0
    }
    return `${this.graphicBeingBuiltAsText.position.get(this.echart)[0]}px`
  }

  get top() {
    if (!this.graphicBeingBuiltAsText || !this.graphicBeingBuiltAsText.position || !this.echart) {
      return 0
    }
    return `${this.graphicBeingBuiltAsText.position.get(this.echart)[1] - 5}px`
  }
}
