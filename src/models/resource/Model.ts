/**
 * Model
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import ModelSchema from '../../schemas/Model.schema'

/* TODO: review generated class */
export class Model extends Resource {
  readonly $name: string = 'Model'
  readonly $endpoint: string = '/User/Model{/id}'

  get $schema() {
    return ModelSchema(this)
  }

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
}
