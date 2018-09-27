/**
 * OaVersionStatus
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool } from 'simpli-ts-vue'

/* TODO: review generated class */
export class OaVersionStatus extends Resource {
  readonly $name: string = 'OaVersionStatus'
  readonly $endpoint: string = '/User/OaVersionStatus{/id}'

  get $id() {
    return this.idOaVersionStatusPk
  }
  set $id(val: ID) {
    this.idOaVersionStatusPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idOaVersionStatusPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired() active: boolean = false

  scheme() {
    return {
      idOaVersionStatusPk: this.idOaVersionStatusPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idOaVersionStatusPk: this.idOaVersionStatusPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
