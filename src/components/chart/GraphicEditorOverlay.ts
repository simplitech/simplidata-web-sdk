import echarts from 'echarts'

const template = `
    <div class="graphic-editor-overlay relative z-1 w-full">
        <textarea v-if="drawingState.editingText" v-model="drawingState.graphicOfWorkAsText.text"
          v-focus class="w-400 p-0" :style="{ top: textareaTop, left: textareaLeft, color: drawingState.graphicOfWork.color }"
          :placeholder="$t('view.chart.typeHere')"></textarea>
          
        <div class="graphic-editor-buttons horiz gutter-4 top-25 left-50 p-4">
          <a class="chart-undo w-40 h-40"/>
          <a class="chart-redo w-40 h-40"/>
        </div>
          
        <div v-if="drawingState.graphicOfWork" class="graphic-editor-buttons horiz gutter-4 top-25 left-160 p-4">
          <a class="chart-remove w-40 h-40"/>
          <a class="chart-font-size w-40 h-40"/>
          <div class="chart-button w-40 h-40 p-4"><input type="color" v-model="drawingState.graphicOfWork.color" class="w-full h-full colorpicker"/></div>
          <a @click="drawingState.finishWork()" class="close w-10 h-10 m-8 ml-10"></a>
        </div>
    </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart, TextChartGraphic, ChartGraphic } from '../../models'
import ChartBus from '../../utils/ChartBus'
import { DrawingState } from './DrawingState'

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

  @Prop({ type: Object, required: true })
  drawingState!: DrawingState

  @Prop({ type: Object })
  echart?: echarts.ECharts

  get textareaLeft() {
    if (!this.drawingState.graphicOfWorkAsText || !this.drawingState.graphicOfWorkAsText.position || !this.echart) {
      return 0
    }
    return `${this.drawingState.graphicOfWorkAsText.position.get(this.echart)[0]}px`
  }

  get textareaTop() {
    if (!this.drawingState.graphicOfWorkAsText || !this.drawingState.graphicOfWorkAsText.position || !this.echart) {
      return 0
    }
    return `${this.drawingState.graphicOfWorkAsText.position.get(this.echart)[1] - 5}px`
  }
}
