/**
 * ValueType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'

/* TODO: review generated class */
export class ValueType extends Resource {
  readonly $name: string = 'ValueType'
  readonly $endpoint: string = '/User/ValueType{/id}'

  get $id() {
    return this.idValueTypePk
  }
  set $id(val: ID) {
    this.idValueTypePk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(ObjectOfAnalysis)
  oaValueTypeAvailability: ObjectOfAnalysis[] = []

  idValueTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  scheme(): any {
    return {
      idValueTypePk: this.idValueTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      idValueTypePk: this.idValueTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
