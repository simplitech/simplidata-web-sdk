import echarts from 'echarts'

const template = `
    <div>
      <div class="graphic-editor-overlay relative z-1 w-full">
        <textarea v-if="drawingState.editingText" v-model="drawingState.graphicOfWorkAsText.text"
          v-focus class="w-window px-0 py-5" :style="textareaStyle"
          :placeholder="$t('view.chart.typeHere')"></textarea>
          
        <div class="horiz top-25 left-50 gutter-50">
          <div class="graphic-editor-buttons horiz gutter-4 p-4">
            <a @click="drawingState.undo()" class="chart-undo w-40 h-40" :style="{ visibility: drawingState.canUndo ? 'inherit' : 'hidden' }"/>
            <a @click="drawingState.redo()" class="chart-redo w-40 h-40" :style="{ visibility: drawingState.canRedo ? 'inherit' : 'hidden' }"/>
          </div>
            
          <div v-if="drawingState.graphicOfWork" class="graphic-editor-buttons horiz gutter-4 p-4">
            <a @click="drawingState.trash()" class="chart-remove w-40 h-40"/>
            <div class="chart-button w-40 h-40 p-4"><input type="color" v-model="drawingState.graphicOfWorkColor" class="w-full h-full colorpicker"/></div>
            <a v-if="drawingState.graphicOfWorkAsText" v-popover="{ name: 'sg-fontsize' + _uid }" class="chart-font-size pl-40 pr-7 h-40 line-h-40">
            {{ drawingState.graphicOfWorkAsText.fontSize }}
            </a>
            <a @click="drawingState.finishWork()" class="close w-10 h-10 m-8 ml-10"></a>
          </div>
        </div>
      </div>
  
      <transition name="fade-down" mode="out-in">
        <popover :name="'sg-fontsize' + _uid" ref="popover" style="width: 60px">
          <div class="popover-content">
            <div v-for="fs in fontSizes"
            :key="fs"
            class="liTC px-15 py-10"
            @click="changeFontSize(fs)">
             {{ fs }}
            </div>
          </div>
        </popover>
      </transition>
    </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { UserSavedChart } from '../../models'
import { DrawingState } from './DrawingState'
import { Popover } from 'vue-js-popover'

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

  fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 36, 48]

  get textareaStyle() {
    if (!this.drawingState.graphicOfWorkAsText) {
      return null
    }

    return {
      top: this.textareaTop,
      left: this.textareaLeft,
      color: this.drawingState.graphicOfWorkAsText.color,
      'font-size': this.drawingState.graphicOfWorkAsText.fontSize + 'px',
      'line-height': this.drawingState.graphicOfWorkAsText.fontSize + 'px',
    }
  }

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

  changeFontSize(fs: number) {
    // @ts-ignore
    const component = this.$refs.popover as Popover
    component.visible = false

    this.drawingState.changeFontSize(fs)
  }
}
