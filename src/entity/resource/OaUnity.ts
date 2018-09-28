/**
 * OaUnity
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'

/* TODO: review generated class */
export class OaUnity extends Resource {
  readonly $name: string = 'OaUnity'
  readonly $endpoint: string = '/User/OaUnity{/id}'

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

  scheme() {
    return {
      idOaUnityPk: this.idOaUnityPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idOaUnityPk: this.idOaUnityPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
