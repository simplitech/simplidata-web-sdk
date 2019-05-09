/**
 * ChartType
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { $, ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import ChartTypeSchema from '../../schemas/ChartType.schema'
import { removeAccentsAndSpace } from '../../utils'

export class ChartType extends Resource {
  readonly $name: string = 'ChartType'
  readonly $endpoint: string = '/User/ChartType{/id}'

  static LINE = 1
  static BAR = 2
  static AREA = 3
  static TABLE = 4

  get $schema() {
    return ChartTypeSchema(this)
  }

  get $id() {
    return this.idChartTypePk
  }
  set $id(val: ID) {
    this.idChartTypePk = val
  }
  get $tag() {
    return $.t(`slang.${this.$name}.${removeAccentsAndSpace(this.title)}`)
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(ObjectOfAnalysis)
  oaChartTypeAvailability: ObjectOfAnalysis[] = []

  idChartTypePk: ID = ChartType.LINE

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
