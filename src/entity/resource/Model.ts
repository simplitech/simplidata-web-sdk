/**
 * Model
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'

/* TODO: review generated class */
export class Model extends Resource {
  readonly $name: string = 'Model'
  readonly $endpoint: string = '/User/Model{/id}'

  get $id() {
    return this.idModelPk
  }
  set $id(val: ID) {
    this.idModelPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(ObjectOfAnalysis)
  oaMatchModel: ObjectOfAnalysis[] = []

  idModelPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  scheme() {
    return {
      idModelPk: this.idModelPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idModelPk: this.idModelPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
