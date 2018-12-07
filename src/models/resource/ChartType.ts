/**
 * ChartType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import ChartTypeSchema from '../../schemas/ChartType.schema'

/* TODO: review generated class */
export class ChartType extends Resource {
  readonly $name: string = 'ChartType'
  readonly $endpoint: string = '/User/ChartType{/id}'

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
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(ObjectOfAnalysis)
  oaChartTypeAvailability: ObjectOfAnalysis[] = []

  idChartTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
