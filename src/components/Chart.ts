const template = `
  <div>
    Here will be the chart
  </div>
`

import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserSavedChart } from '../models'

@Component({ template })
export class Chart extends Vue {
  @Prop({ type: Array })
  objectOfAnalysisIds?: number[]

  @Prop({ type: Number })
  savedChartId?: number

  @Prop({ type: Object })
  value?: UserSavedChart

  @Prop({ type: Boolean, default: true })
  showSaveButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showDrawingButtons: boolean = true

  @Prop({ type: Boolean, default: true })
  showMeasureButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showCalcButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showCommentButton: boolean = true

  @Prop({ type: Boolean, default: true })
  showChartTypeControl: boolean = true

  @Prop({ type: Boolean, default: true })
  showValueTypeControl: boolean = true

  @Prop({ type: Boolean, default: true })
  showTransformationTypeControl: boolean = true

  @Prop({ type: Boolean, default: false })
  showOaVersionControl: boolean = false

  @Prop({ type: Boolean, default: true })
  showObjectOfAnalysisInfo: boolean = true

  @Prop({ type: Number })
  chartTypeId?: number

  @Prop({ type: Number })
  valueTypeId?: number

  @Prop({ type: Number })
  transformationTypeId?: number

  @Prop({ type: Number })
  oaVersionId?: number
}
