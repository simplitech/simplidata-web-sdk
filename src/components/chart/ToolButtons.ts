import { DrawingState } from './DrawingState'

const template = `
  <div class="verti w-40">

    <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
      :title="$t('view.chart.saveChartOnCollection')" :class="{ 'needs-saving': needsSaving }"></a>

    <popover :name="'sg-save' + _uid" ref="savepopover">
      <save-chart v-model="value" @userSavedChart="$emit('userSavedChart', $event)"/>
    </popover>

    <template v-if="showDrawingButtons">
      <a class="chart-selector h-40 mb-8" :class="{active: !drawingState.selectedDrawingTool}" @click="drawingState.finishWork()"></a>
      
      <div class="mb-8 verti">
        <div class="relative top-30 left-30">
          <a class="chart-drop w-7 h-7" v-popover.right="{ name: 'sg-draw' + _uid }"></a>
        </div>
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Line" 
        class="chart-line h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Line}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Line)"></a>
        
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Ellipse" 
        class="chart-ellipse h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Ellipse}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Ellipse)"></a>
        
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Rectangle" 
        class="chart-rectangle h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Rectangle}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Rectangle)"></a>
      </div>

      <a class="chart-pencil h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Pencil}" 
      @click="drawingState.selectDrawingTool(drawingState.tools.Pencil)"></a>

      <a class="chart-text h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Text}" 
      @click="drawingState.selectDrawingTool(drawingState.tools.Text)"></a>
    </template>
    
    <popover :name="'sg-draw' + _uid" ref="drawpopover" class="force-w-50">
      <div class="verti">
        <a class="chart-line h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Line}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Line)"></a>
        
        <a class="chart-ellipse h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Ellipse}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Ellipse)"></a>
        
        <a class="chart-rectangle h-40 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Rectangle}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Rectangle)"></a>
      </div>
    </popover>

    <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"
       :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Measure}"
       @click="drawingState.selectDrawingTool(drawingState.tools.Measure)"></a>
    
    <a v-if="showCalcButton"
       v-popover.right="{ name: 'sg-calc' + _uid }"
       class="chart-calc h-40 mb-8 items-center"
       :class="{active: ['FibonacciRetraction'].includes(drawingState.selectedDrawingTool)}"
    ></a>

    <popover :name="'sg-calc' + _uid" ref="calcpopover">
      <div class="calcpopover verti">
        <a @click="drawingState.selectDrawingTool(drawingState.tools.FibonacciRetraction)" 
        :class="{active: drawingState.selectedDrawingTool === drawingState.tools.FibonacciRetraction}" class="p-15">
        {{ $t('view.chart.fibonacciRetraction') }}
        </a>
      </div>
    </popover>

    <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"
       :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Comment}"
       @click="drawingState.selectDrawingTool(drawingState.tools.Comment)"></a>
    
    <!-- CHART SHOW COMMENT MODAL -->
    <div v-if="drawingState.graphicSelectedAsComment" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center verti">
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
    <div v-if="drawingState.editingComment" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
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
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Popover from 'vue-js-popover'
import { UserSavedChart } from '../../models'
import { SaveChart } from '../SaveChart'
import { warning } from '../../simpli'

@Component({
  components: { SaveChart },
  template,
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
})
export default class ToolButtons extends Vue {
  @Prop({ type: Object, default: () => new UserSavedChart() })
  value?: UserSavedChart

  @Prop({ type: Object, required: true })
  drawingState!: DrawingState

  @Prop({ type: Boolean, default: true })
  showSaveButton?: boolean

  @Prop({ type: Boolean, default: true })
  showDrawingButtons?: boolean

  @Prop({ type: Boolean, default: true })
  showMeasureButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCalcButton?: boolean

  @Prop({ type: Boolean, default: true })
  showCommentButton?: boolean

  get needsSaving() {
    return (
      this.showSaveButton &&
      this.value &&
      this.value.lastSavedJson.length &&
      this.value.lastSavedJson !== this.value.relevantToSave
    )
  }

  @Watch('drawingState.graphicOfWork')
  hidePopovers() {
    // @ts-ignore
    const drawpopover = this.$refs.drawpopover as Popover
    drawpopover.visible = false

    // @ts-ignore
    const calcpopover = this.$refs.calcpopover as Popover
    calcpopover.visible = false
  }

  @Watch('needsSaving')
  warnIfNeedsSavingForFirstTime() {
    if (!this.drawingState.warningAboutSavingEmmited && this.needsSaving) {
      warning('view.chart.dontFogetToSaveYourChanges')
      this.drawingState.warningAboutSavingEmmited = true
    }
  }
}
