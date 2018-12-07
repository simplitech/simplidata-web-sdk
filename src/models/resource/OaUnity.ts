/**
 * OaUnity
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
import OaUnitySchema from '../../schemas/OaUnity.schema'

/* TODO: review generated class */
export class OaUnity extends Resource {
  readonly $name: string = 'OaUnity'
  readonly $endpoint: string = '/User/OaUnity{/id}'

  get $schema() {
    return OaUnitySchema(this)
  }

  get $id() {
    return this.idOaUnityPk
  }
  set $id(val: ID) {
    this.idOaUnityPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idOaUnityPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
