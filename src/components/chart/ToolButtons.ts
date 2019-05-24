import { DrawingState } from './DrawingState'

const template = `
  <div class="verti w-40">

    <a v-if="showSaveButton" v-popover.right="{ name: 'sg-save' + _uid }" class="chart-save h-40 mb-8 items-center"
      :title="$t('view.chart.saveChartOnCollection')" :class="{ 'needs-saving': needsSaving }" :title="$t('view.chart.tooltip.save')"></a>

    <popover :name="'sg-save' + _uid" ref="savepopover">
      <save-chart v-model="value" @userSavedChart="onUserSavedChart($event)"/>
    </popover>

    <template v-if="showDrawingButtons">
      <a class="chart-selector h-40 mb-8" :class="{active: !drawingState.selectedDrawingTool}" 
      @click="drawingState.finishWork()" :title="$t('view.chart.tooltip.select')"></a>
      
      <div class="mb-8 verti">
        <div class="relative top-30 left-30">
          <a class="chart-drop w-7 h-7" v-popover.right="{ name: 'sg-draw' + _uid }"></a>
        </div>
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Line" 
        class="chart-line h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Line}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Line)"
        :title="$t('view.chart.tooltip.line')"></a>
        
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Ellipse" 
        class="chart-ellipse h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Ellipse}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Ellipse)"
        :title="$t('view.chart.tooltip.ellipse')"></a>
        
        <a v-if="drawingState.lastBasicDrawingTool === drawingState.tools.Rectangle" 
        class="chart-rectangle h-40" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Rectangle}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Rectangle)"
        :title="$t('view.chart.tooltip.rectangle')"></a>
      </div>

      <a class="chart-pencil h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Pencil}" 
      @click="drawingState.selectDrawingTool(drawingState.tools.Pencil)"
      :title="$t('view.chart.tooltip.pencil')"></a>

      <a class="chart-text h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Text}" 
      @click="drawingState.selectDrawingTool(drawingState.tools.Text)"
      :title="$t('view.chart.tooltip.text')"></a>
    </template>
    
    <popover :name="'sg-draw' + _uid" ref="drawpopover" class="force-w-50">
      <div class="verti">
        <a class="chart-line h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Line}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Line)"
        :title="$t('view.chart.tooltip.line')"></a>
        
        <a class="chart-ellipse h-40 mb-8 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Ellipse}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Ellipse)"
        :title="$t('view.chart.tooltip.ellipse')"></a>
        
        <a class="chart-rectangle h-40 items-center" :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Rectangle}" 
        @click="drawingState.selectDrawingTool(drawingState.tools.Rectangle)"
        :title="$t('view.chart.tooltip.rectangle')"></a>
      </div>
    </popover>

    <a v-if="showMeasureButton" class="chart-measure h-40 mb-8 items-center"
       :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Measure}"
       @click="drawingState.selectDrawingTool(drawingState.tools.Measure)"
       :title="$t('view.chart.tooltip.measure')"></a>
    
    <a v-if="showCalcButton"
       v-popover.right="{ name: 'sg-calc' + _uid }"
       class="chart-calc h-40 mb-8 items-center"
       :class="{active: ['FibonacciRetraction'].includes(drawingState.selectedDrawingTool)}"
       :title="$t('view.chart.tooltip.calc')"
    ></a>

    <popover :name="'sg-calc' + _uid" ref="calcpopover">
      <div class="calcpopover verti">
        <a @click="drawingState.selectDrawingTool(drawingState.tools.FibonacciRetraction)" 
        :class="{active: drawingState.selectedDrawingTool === drawingState.tools.FibonacciRetraction}"
        :title="$t('view.chart.tooltip.fibonacci')" class="p-15">
        {{ $t('view.chart.fibonacciRetraction') }}
        </a>
      </div>
    </popover>

    <a v-if="showCommentButton" class="chart-comment h-40 mb-8 items-center"
       :class="{active: drawingState.selectedDrawingTool === drawingState.tools.Comment}"
       @click="drawingState.selectDrawingTool(drawingState.tools.Comment)"
       :title="$t('view.chart.tooltip.comment')"></a>

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

  onUserSavedChart(e: any) {
    // @ts-ignore
    const component = this.$refs.savepopover as Popover
    component.visible = false

    this.$emit('userSavedChart', e)
  }
}
