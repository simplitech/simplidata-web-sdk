/**
 * Model
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import ModelSchema from '../../schemas/Model.schema'
import { Exclude } from 'class-transformer'

export class Model extends Resource {
  @Exclude({ toPlainOnly: true })
  readonly $name: string = 'Model'
  @Exclude({ toPlainOnly: true })
  readonly $endpoint: string = '/User/Model{/id}'

  @Exclude({ toPlainOnly: true })
  get $schema() {
    return ModelSchema(this)
  }

  @Exclude({ toPlainOnly: true })
  get $id() {
    return this.idModelPk
  }
  set $id(val: ID) {
    this.idModelPk = val
  }

  @Exclude({ toPlainOnly: true })
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @Exclude({ toPlainOnly: true })
  @ResponseSerialize(ObjectOfAnalysis)
  oaMatchModel: ObjectOfAnalysis[] = []

  idModelPk: ID = 0

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  active: boolean = false
}
