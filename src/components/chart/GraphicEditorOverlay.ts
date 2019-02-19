import echarts from 'echarts'

const template = `
    <div class="graphic-editor-overlay relative z-high w-full">
        <textarea v-if="editingText" v-model="graphicOfWorkAsText.text"
          v-focus class="w-400 p-0" :style="{ top: textareaTop, left: textareaLeft, color: graphicOfWork.color }"
          :placeholder="$t('view.chart.typeHere')"></textarea>
          
        <div class="graphic-editor-buttons horiz gutter-4 top-25 left-50 p-4">
          <a class="chart-undo w-40 h-40"/>
          <a class="chart-redo w-40 h-40"/>
        </div>
          
        <div v-if="graphicOfWork" class="graphic-editor-buttons horiz gutter-4 top-25 left-160 p-4">
          <a class="chart-remove w-40 h-40"/>
          <a class="chart-font-size w-40 h-40"/>
          <div class="chart-button w-40 h-40 p-4"><input type="color" v-model="graphicOfWork.color" class="w-full h-full colorpicker"/></div>
          <a @click="finishWork" class="close w-10 h-10 m-8 ml-10"></a>
        </div>
    </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, TextChartGraphic, ChartGraphic } from '../../models'
import ChartBus from '../../utils/ChartBus'

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

  graphicSelected: ChartGraphic | null = null

  get graphicOfWork(): ChartGraphic | null {
    return this.graphicBeingBuilt || this.graphicSelected
  }

  get graphicOfWorkAsText() {
    if (!this.graphicOfWork || !(this.graphicOfWork.name === 'TextChartGraphic')) {
      return null
    }

    return this.graphicOfWork as TextChartGraphic
  }

  get editingText() {
    return (
      this.graphicOfWork &&
      !this.graphicOfWork.isDone &&
      !this.graphicOfWork.isCancelled &&
      this.graphicOfWorkAsText &&
      this.graphicOfWorkAsText.position !== null
    )
  }

  get textareaLeft() {
    if (!this.graphicOfWorkAsText || !this.graphicOfWorkAsText.position || !this.echart) {
      return 0
    }
    return `${this.graphicOfWorkAsText.position.get(this.echart)[0]}px`
  }

  get textareaTop() {
    if (!this.graphicOfWorkAsText || !this.graphicOfWorkAsText.position || !this.echart) {
      return 0
    }
    return `${this.graphicOfWorkAsText.position.get(this.echart)[1] - 5}px`
  }

  mounted() {
    ChartBus.$on('graphicSelect', (chartGraphic: ChartGraphic) => {
      this.graphicSelected = chartGraphic
    })
  }

  finishWork() {
    if (this.graphicBeingBuilt) {
      if (this.graphicBeingBuilt.isValidToSave) {
        this.graphicBeingBuilt.isDone = true
      } else {
        this.graphicBeingBuilt.isCancelled = true
      }
    }
    this.graphicSelected = null
  }
}
