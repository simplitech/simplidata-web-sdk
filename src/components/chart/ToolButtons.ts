const template = `
  <div class="verti w-40">

    <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
      :title="$t('view.chart.saveChartOnCollection')" :class="{ 'needs-saving': needsSaving }"></a>

    <popover :name="'sg-save' + _uid" ref="savepopover">
      <save-chart v-model="value" @userSavedChart="$emit('userSavedChart', $event)"/>
    </popover>

    <template v-if="showDrawingButtons">
      <a class="chart-selector h-40 mb-8" :class="{active: !selectedDrawingTool}" @click="clearDrawingTool"></a>
      
      <div class="mb-8 verti">
        <div class="relative top-30 left-30">
          <a class="chart-drop w-7 h-7" v-popover.right="{ name: 'sg-draw' + _uid }"></a>
        </div>
        <a v-if="lastBasicDrawingTool === 'Line'" class="chart-line h-40" :class="{active: selectedDrawingTool === 'Line'}" @click="selectDrawingTool('Line')"></a>
        <a v-if="lastBasicDrawingTool === 'Ellipse'" class="chart-ellipse h-40" :class="{active: selectedDrawingTool === 'Ellipse'}" @click="selectDrawingTool('Ellipse')"></a>
        <a v-if="lastBasicDrawingTool === 'Rectangle'" class="chart-rectangle h-40" :class="{active: selectedDrawingTool === 'Rectangle'}" @click="selectDrawingTool('Rectangle')"></a>
      </div>

      <a class="chart-pencil h-40 mb-8 items-center" :class="{active: selectedDrawingTool === 'Pencil'}" @click="selectDrawingTool('Pencil')"></a>

      <a class="chart-text h-40 mb-8 items-center" :class="{active: selectedDrawingTool === 'Text'}" @click="selectDrawingTool('Text')"></a>
    </template>
    
    <popover :name="'sg-draw' + _uid" ref="drawpopover" class="force-w-50">
      <div class="verti">
        <a class="chart-line h-40 mb-8 items-center" :class="{active: selectedDrawingTool === 'Line'}" @click="selectDrawingTool('Line')"></a>
        <a class="chart-ellipse h-40 mb-8 items-center" :class="{active: selectedDrawingTool === 'Ellipse'}" @click="selectDrawingTool('Ellipse')"></a>
        <a class="chart-rectangle h-40 items-center" :class="{active: selectedDrawingTool === 'Rectangle'}" @click="selectDrawingTool('Rectangle')"></a>
      </div>
    </popover>

    <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"
       :class="{active: selectedDrawingTool === 'Measure'}"
       @click="selectDrawingTool('Measure')"></a>
    
    <a v-if="showCalcButton"
       v-popover.right="{ name: 'sg-calc' + _uid }"
       class="chart-calc h-40 mb-8 items-center"
       :class="{active: ['FibonacciRetraction'].includes(selectedDrawingTool)}"
    ></a>

    <popover :name="'sg-calc' + _uid" ref="calcpopover">
      <div class="calcpopover verti">
        <a @click="selectDrawingTool('FibonacciRetraction')" :class="{active: selectedDrawingTool === 'FibonacciRetraction'}" class="p-15">{{ $t('view.chart.fibonacciRetraction') }}</a>
      </div>
    </popover>

    <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"
       :class="{active: selectedDrawingTool === 'Comment'}"
       @click="selectDrawingTool('Comment')"></a>
    
    <!-- CHART SHOW COMMENT MODAL -->
    <div v-if="commentOpen" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center verti">
      <div class="popup p-20 w-450 verti items-center">
        <a @click="closeComment" class="close w-20 h-20 self-right"></a>
        <p class="comment-text">
          {{ commentOpen.text }}
        </p>
        <a @click="showEditCommentButtons = !showEditCommentButtons" class="ctx-hor w-40 h-15 self-right" 
          :class="{ active: showEditCommentButtons}"></a>
      </div>
      <div :style="{ opacity: showEditCommentButtons ? 1 : 0 }" class="horiz w-450 items-right-center mt-8 transition">
        <a @click="removeCommentOpen" class="btn basic trash force-min-w-50 force-h-25 mr-6"></a>
        <a @click="editCommentOpen" class="btn basic edit force-min-w-50 force-h-25"></a>
      </div>
    </div>
    
    <!-- CHART EDIT COMMENT MODAL -->
    <div v-if="editingComment" class="scrim fixed top-0 left-0 w-window h-window z-modal items-center">
      <div class="popup p-20 w-450 verti">
        <input
          v-focus
          v-model="graphicBeingBuiltAsComment.text"
          type="text"
          class="input-comment mb-15"
          :placeholder="$t('view.chart.writeYourComment')"/>
        <div class="horiz items-right-center">
          <a class="cancel-btn w-50 h-30"
            @click="graphicBeingBuilt.isCancelled = true"></a>
          <a class="ok-btn w-50 h-30" :class="{ 'opacity-20': !graphicBeingBuilt.isValidToSave }"
             @click="graphicBeingBuilt.isDone = true"></a>
         </div>
      </div>
    </div>

  </div>
`

import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import Popover from 'vue-js-popover'
import {
  UserSavedChart,
  LineChartGraphic,
  EllipseChartGraphic,
  RectangleChartGraphic,
  PencilChartGraphic,
  TextChartGraphic,
  CommentChartGraphic,
  MeasureChartGraphic,
  FibonacciRetractionChartGraphic,
  ChartGraphic,
} from '../../models'
import ChartBus from '../../utils/ChartBus'
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

  readonly BASIC_DRAWING_TOOLS = ['Line', 'Ellipse', 'Rectangle']

  selectedDrawingTool: string | null = null
  lastBasicDrawingTool = 'Line'
  commentOpen: CommentChartGraphic | null = null
  graphicBeingBuilt: ChartGraphic | null = null
  showEditCommentButtons = false
  warningAboutSavingEmmited = false

  get graphicBeingBuiltAsComment() {
    if (!this.graphicBeingBuilt || !(this.graphicBeingBuilt instanceof CommentChartGraphic)) {
      return null
    }

    return this.graphicBeingBuilt as CommentChartGraphic
  }

  get editingComment() {
    return (
      this.graphicBeingBuilt &&
      !this.graphicBeingBuilt.isDone &&
      !this.graphicBeingBuilt.isCancelled &&
      this.graphicBeingBuiltAsComment &&
      this.graphicBeingBuiltAsComment.position !== null
    )
  }

  get needsSaving() {
    return (
      this.value &&
      this.value.lastSavedJson.length &&
      this.value.oaVersionIds &&
      this.value.unsavedJson !== this.value.lastSavedJson
    )
  }

  selectDrawingTool(newSelected: string) {
    this.selectedDrawingTool = newSelected

    if (this.BASIC_DRAWING_TOOLS.indexOf(newSelected) > -1) {
      this.lastBasicDrawingTool = newSelected
    }

    // @ts-ignore
    const drawpopover = this.$refs.drawpopover as Popover
    drawpopover.visible = false

    // @ts-ignore
    const calcpopover = this.$refs.calcpopover as Popover
    calcpopover.visible = false

    if (this.selectedDrawingTool === 'Line') {
      this.graphicBeingBuilt = new LineChartGraphic()
    } else if (this.selectedDrawingTool === 'Ellipse') {
      this.graphicBeingBuilt = new EllipseChartGraphic()
    } else if (this.selectedDrawingTool === 'Rectangle') {
      this.graphicBeingBuilt = new RectangleChartGraphic()
    } else if (this.selectedDrawingTool === 'Pencil') {
      this.graphicBeingBuilt = new PencilChartGraphic()
    } else if (this.selectedDrawingTool === 'Text') {
      this.graphicBeingBuilt = new TextChartGraphic()
    } else if (this.selectedDrawingTool === 'Comment') {
      this.graphicBeingBuilt = new CommentChartGraphic()
    } else if (this.selectedDrawingTool === 'Measure') {
      this.graphicBeingBuilt = new MeasureChartGraphic()
    } else if (this.selectedDrawingTool === 'FibonacciRetraction') {
      this.graphicBeingBuilt = new FibonacciRetractionChartGraphic()
    }

    this.$emit('selectedDrawingTool', this.graphicBeingBuilt)
  }

  clearDrawingTool() {
    this.selectedDrawingTool = null
    this.graphicBeingBuilt = null
    this.$emit('selectedDrawingTool', this.graphicBeingBuilt)
  }

  resetDrawingTool() {
    if (!this.graphicBeingBuilt) {
      return
    }

    this.graphicBeingBuilt = this.graphicBeingBuilt.cleanCopy()
    this.$emit('selectedDrawingTool', this.graphicBeingBuilt)
  }

  @Watch('graphicBeingBuilt.isDone')
  doneEditingGraphic() {
    if (this.graphicBeingBuilt && this.graphicBeingBuilt.isDone) {
      if (this.value) {
        this.value.graphics.push(this.graphicBeingBuilt)
      }
      this.resetDrawingTool()
    }
  }

  @Watch('graphicBeingBuilt.isCancelled')
  cancelEditingDrawing() {
    if (this.graphicBeingBuilt && this.graphicBeingBuilt.isCancelled) {
      this.clearDrawingTool()
    }
  }

  @Watch('needsSaving')
  warnIfNeedsSavingForFirstTime() {
    if (!this.warningAboutSavingEmmited && this.needsSaving) {
      warning('view.chart.dontFogetToSaveYourChanges')
      this.warningAboutSavingEmmited = true
    }
  }

  editCommentOpen() {
    if (!this.commentOpen) {
      return
    }
    this.commentOpen.isDone = false
    this.graphicBeingBuilt = this.commentOpen
    this.removeCommentOpen()
  }

  removeCommentOpen() {
    if (!this.commentOpen) {
      return
    }
    this.removeGraphic(this.commentOpen)
    this.closeComment()
  }

  closeComment() {
    this.commentOpen = null
    this.showEditCommentButtons = false
  }

  removeGraphic(graphic: ChartGraphic) {
    if (!this.value) {
      return
    }

    const index = this.value.graphics.indexOf(graphic)
    if (index > -1) {
      this.value.graphics.splice(index, 1)
    }
  }

  async mounted() {
    ChartBus.$on('openComment', this.openChartComment)
  }

  openChartComment(comment: CommentChartGraphic) {
    this.commentOpen = comment
  }
}
