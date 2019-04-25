import {
  ChartGraphic,
  CommentChartGraphic,
  EllipseChartGraphic,
  FibonacciRetractionChartGraphic,
  LineChartGraphic,
  MeasureChartGraphic,
  PencilChartGraphic,
  RectangleChartGraphic,
  TextChartGraphic,
  UserSavedChart,
} from '../../models'
import ChartBus from '../../utils/ChartBus'
import hotkeys from 'hotkeys-js'
import echarts from 'echarts'

export class DrawingState {
  static readonly BASIC_DRAWING_TOOLS = ['Line', 'Ellipse', 'Rectangle']
  readonly tools = {
    Line: 'Line',
    Ellipse: 'Ellipse',
    Rectangle: 'Rectangle',
    Pencil: 'Pencil',
    Text: 'Text',
    Measure: 'Measure',
    FibonacciRetraction: 'FibonacciRetraction',
    Comment: 'Comment',
  }

  value: UserSavedChart
  echart: echarts.ECharts | null = null

  selectedDrawingTool: string | null = null
  lastBasicDrawingTool = 'Line'

  graphicBeingBuilt: ChartGraphic | null = null
  graphicSelected: ChartGraphic | null = null

  showEditCommentButtons = false
  warningAboutSavingEmmited = false

  historyToUndo: ChartGraphic[][] = []
  historyToRedo: ChartGraphic[][] = []

  dragStartX: number | null = null
  dragStartY: number | null = null

  constructor(value: UserSavedChart) {
    this.value = value
    ChartBus.$on('openComment', (comment: CommentChartGraphic) => this.openChartComment(comment))
    ChartBus.$on('cancelDrawing', () => this.clearDrawingTool())
    ChartBus.$on('doneDrawing', () => this.doneDrawing())
    ChartBus.$on('graphicSelect', (g: ChartGraphic) => this.selectGraphic(g))
    ChartBus.$on('graphicDragStart', (pos: number[]) => this.dragStart(pos))
    ChartBus.$on('graphicDragEnd', (graphicAndPos: any) => this.dragEnd(graphicAndPos.graphic, graphicAndPos.pos))
    hotkeys('ctrl+z', () => this.undo())
    hotkeys('ctrl+shift+z', () => this.redo())
  }

  get graphicOfWork(): ChartGraphic | null {
    return this.graphicBeingBuilt || this.graphicSelected
  }

  get graphicOfWorkAsComment() {
    if (!this.graphicOfWork || !(this.graphicOfWork.name === 'CommentChartGraphic')) {
      return null
    }

    return this.graphicOfWork as CommentChartGraphic
  }

  get graphicSelectedAsComment() {
    if (!this.graphicSelected || !(this.graphicSelected.name === 'CommentChartGraphic')) {
      return null
    }

    return this.graphicSelected as CommentChartGraphic
  }

  get graphicOfWorkAsText() {
    if (!this.graphicOfWork || !(this.graphicOfWork.name === 'TextChartGraphic')) {
      return null
    }

    return this.graphicOfWork as TextChartGraphic
  }

  get editingComment() {
    return (
      this.graphicOfWorkAsComment &&
      this.graphicOfWorkAsComment.position !== null &&
      !this.graphicOfWorkAsComment.isDone
    )
  }

  get editingText() {
    return this.graphicOfWorkAsText && this.graphicOfWorkAsText.position !== null
  }

  get canUndo() {
    return this.historyToUndo.length > 0
  }

  get canRedo() {
    return this.historyToRedo.length > 0
  }

  get graphicOfWorkColor() {
    return this.graphicOfWork ? this.graphicOfWork.color : null
  }

  set graphicOfWorkColor(color: string | null) {
    if (this.graphicSelected) {
      this.saveToUndo()
    }

    if (color && this.graphicOfWork) {
      this.graphicOfWork.color = color
    }
  }

  selectDrawingTool(newSelected: string) {
    this.finishWork()
    this.selectedDrawingTool = newSelected

    if (DrawingState.BASIC_DRAWING_TOOLS.indexOf(newSelected) > -1) {
      this.lastBasicDrawingTool = newSelected
    }

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
  }

  editCommentOpen() {
    if (!this.graphicSelectedAsComment) {
      return
    }
    this.graphicSelectedAsComment.isDone = false
  }

  doneDrawing() {
    if (this.graphicOfWork && this.graphicOfWork.isValidToSave) {
      this.saveToUndo()
      this.historyToRedo = []
      this.graphicOfWork.isDone = true
      if (this.graphicBeingBuilt) {
        this.value.graphics.push(this.graphicBeingBuilt)
      }
      this.clearDrawingTool() // TODO: this can be replaced by resetDrawingTool if we dont want to stop using the tool
    }
  }

  trash() {
    if (this.graphicSelected) {
      const index = this.value.graphics.indexOf(this.graphicSelected)
      this.graphicSelected = null
      if (index > -1) {
        this.saveToUndo()
        this.historyToRedo = []
        this.value.graphics.splice(index, 1)
      }
    }
    this.clearDrawingTool()
  }

  changeFontSize(fs: number) {
    if (this.graphicSelected) {
      this.saveToUndo()
    }

    if (this.graphicOfWorkAsText) {
      this.graphicOfWorkAsText.fontSize = fs
    }
  }

  saveToUndo() {
    this.historyToUndo.push(this.value.graphics.map(g => g.clone()))
  }

  saveToRedo() {
    this.historyToRedo.push(this.value.graphics.map(g => g.clone()))
  }

  undo() {
    const lastState = this.historyToUndo.pop()
    if (lastState) {
      this.saveToRedo()
      this.value.graphics = lastState
    }
  }

  redo() {
    const futureState = this.historyToRedo.pop()
    if (futureState) {
      this.saveToUndo()
      this.value.graphics = futureState
    }
  }

  finishWork() {
    if (this.graphicOfWork) {
      if (this.graphicOfWork.isValidToSave) {
        this.doneDrawing()
      } else {
        this.clearDrawingTool()
      }
    }
    this.graphicSelected = null
  }

  clearDrawingTool() {
    this.selectedDrawingTool = null
    this.graphicBeingBuilt = null

    if (this.graphicSelected) {
      this.graphicSelected.isDone = true
    }
  }

  resetDrawingTool() {
    this.selectedDrawingTool = null

    if (this.graphicBeingBuilt !== null) {
      this.graphicBeingBuilt = this.graphicBeingBuilt.cleanCopy()
    }
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

  removeCommentOpen() {
    if (!this.graphicSelectedAsComment) {
      return
    }
    this.removeGraphic(this.graphicSelectedAsComment)
    this.closeComment()
  }

  closeComment() {
    this.graphicSelected = null
    this.showEditCommentButtons = false
  }

  openChartComment(comment: CommentChartGraphic) {
    if (this.value.graphics.includes(comment)) {
      this.graphicSelected = comment
    }
  }

  selectGraphic(graphic: ChartGraphic) {
    if (this.value.graphics.includes(graphic)) {
      this.graphicSelected = graphic
    }
  }

  dragStart(pos: number[]) {
    this.dragStartX = pos[0]
    this.dragStartY = pos[1]
  }

  dragEnd(graphic: ChartGraphic, pos: number[]) {
    if (
      this.value.graphics.includes(graphic) &&
      this.dragStartX !== null &&
      this.dragStartY !== null &&
      this.echart !== null
    ) {
      this.saveToUndo()
      graphic.offsetPosition(this.echart, pos[0] - this.dragStartX, pos[1] - this.dragStartY)
      this.dragStartX = null
      this.dragStartY = null
    }
  }
}
