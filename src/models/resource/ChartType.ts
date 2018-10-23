/**
 * ChartType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'

/* TODO: review generated class */
export class ChartType extends Resource {
  readonly $name: string = 'ChartType'
  readonly $endpoint: string = '/User/ChartType{/id}'

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

  scheme(): any {
    return {
      idChartTypePk: this.idChartTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      idChartTypePk: this.idChartTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
