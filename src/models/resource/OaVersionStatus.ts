/**
 * OaVersionStatus
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import OaVersionStatusSchema from '../../schemas/OaVersionStatus.schema'

/* TODO: review generated class */
export class OaVersionStatus extends Resource {
  readonly $name: string = 'OaVersionStatus'
  readonly $endpoint: string = '/User/OaVersionStatus{/id}'

  get $schema() {
    return OaVersionStatusSchema(this)
  }

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

  @ValidationRequired()
  active: boolean = false
}
