/**
 * News
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
// import {OaCategory} from './OaCategory'
import MissingOaComplainSchema from '../../schemas/MissingOaComplain.schema'

export class MissingOaComplain extends Resource {
  readonly $name: string = 'MissingOaComplain'
  readonly $endpoint: string = '/User/MissingOaComplain{/id}'

  get $schema() {
    return MissingOaComplainSchema(this)
  }

  get $id() {
    return this.idMissingOaComplainPk
  }
  set $id(val: ID) {
    this.idMissingOaComplainPk = val
  }
  get $tag() {
    return this.text
  }
  set $tag(val: TAG) {
    this.text = val
  }

  idMissingOaComplainPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  text: string = ''

  creationDate: string | null = null
}
