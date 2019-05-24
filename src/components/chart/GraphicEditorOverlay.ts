import echarts from 'echarts'

const template = `
    <div>
      <div class="graphic-editor-overlay relative z-1 w-full">
        <textarea v-if="showDrawingButtons && drawingState.editingText" v-model="drawingState.graphicOfWorkAsText.text"
          v-focus class="w-window px-0 py-5" :style="textareaStyle"
          :placeholder="$t('view.chart.typeHere')"></textarea>
          
        <div v-if="showDrawingButtons" class="horiz top-25 left-50 gutter-50">
          <div class="graphic-editor-buttons horiz gutter-4 p-4">
            <a @click="drawingState.undo()" class="chart-undo w-40 h-40" :style="{ visibility: drawingState.canUndo ? 'inherit' : 'hidden' }"/>
            <a @click="drawingState.redo()" class="chart-redo w-40 h-40" :style="{ visibility: drawingState.canRedo ? 'inherit' : 'hidden' }"/>
          </div>
            
          <div v-if="drawingState.graphicOfWork" class="graphic-editor-buttons horiz gutter-4 p-4">
            <a @click="drawingState.trash()" class="chart-remove w-40 h-40"/>
            <div v-if="drawingState.graphicOfWorkMayHaveColor" class="chart-button w-40 h-40 p-4">
              <input type="color" v-model="drawingState.graphicOfWorkColor" class="w-full h-full colorpicker"/>
            </div>
            <a v-if="drawingState.graphicOfWorkAsText" v-popover="{ name: 'sg-fontsize' + _uid }" class="chart-font-size pl-40 pr-7 h-40 line-h-40">
            {{ drawingState.graphicOfWorkAsText.fontSize }}
            </a>
            <a @click="drawingState.finishWork()" class="close w-10 h-10 m-8 ml-10"></a>
          </div>
        </div>
        
        <!-- CHART SHOW COMMENT MODAL -->
        <div v-if="drawingState.graphicSelectedAsComment && !drawingState.editingComment" class="top-100 left-100 items-center verti">
          <div class="popup p-20 w-450 verti items-center">
            <a @click="drawingState.closeComment()" class="close w-20 h-20 self-right"></a>
            <p class="comment-text">
              {{ drawingState.graphicSelectedAsComment.text }}
            </p>
            <a v-if="showDrawingButtons" @click="drawingState.showEditCommentButtons = !drawingState.showEditCommentButtons" class="ctx-hor w-40 h-15 self-right" 
              :class="{ active: drawingState.showEditCommentButtons}"></a>
          </div>
          <div :style="{ opacity: drawingState.showEditCommentButtons ? 1 : 0 }" class="horiz w-450 items-right-center mt-8 transition">
            <a @click="drawingState.removeCommentOpen()" class="btn basic trash force-min-w-50 force-h-25 mr-6"></a>
            <a @click="drawingState.editCommentOpen()" class="btn basic edit force-min-w-50 force-h-25"></a>
          </div>
        </div>
    
        <!-- CHART EDIT COMMENT MODAL -->
        <div v-if="drawingState.editingComment" class="top-100 left-100 items-center">
          <div class="popup p-20 w-450 verti">
            <input
              v-focus
              v-model="drawingState.graphicOfWorkAsComment.text"
              type="text"
              class="input-comment mb-15"
              :placeholder="$t('view.chart.writeYourComment')"/>
            <div class="horiz items-right-center">
              <a class="cancel-btn w-50 h-30"
                @click="drawingState.clearDrawingTool()"></a>
              <a class="ok-btn w-50 h-30" :class="{ 'opacity-20': !drawingState.graphicOfWork.isValidToSave }"
                 @click="drawingState.doneDrawing()"></a>
             </div>
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

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

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
