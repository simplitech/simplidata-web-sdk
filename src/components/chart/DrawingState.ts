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

export class DrawingState {
  static readonly BASIC_DRAWING_TOOLS = ['Line', 'Ellipse', 'Rectangle']

  value: UserSavedChart

  selectedDrawingTool: string | null = null
  lastBasicDrawingTool = 'Line'

  graphicBeingBuilt: ChartGraphic | null = null
  graphicSelected: ChartGraphic | null = null

  showEditCommentButtons = false
  warningAboutSavingEmmited = false

  constructor(value: UserSavedChart) {
    this.value = value
    ChartBus.$on('openComment', (comment: CommentChartGraphic) => this.openChartComment(comment))
    ChartBus.$on('cancelDrawing', () => this.clearDrawingTool())
    ChartBus.$on('doneDrawing', () => this.doneDrawing())
    ChartBus.$on('graphicSelect', (g: ChartGraphic) => this.selectGraphic(g))
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

  selectDrawingTool(newSelected: string) {
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
      this.graphicOfWork.isDone = true
      if (this.graphicBeingBuilt) {
        this.value.graphics.push(this.graphicBeingBuilt)
      }
      this.clearDrawingTool() // TODO: this can be replaced by resetDrawingTool
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
}
