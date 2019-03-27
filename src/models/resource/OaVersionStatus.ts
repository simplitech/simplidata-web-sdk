/**
 * OaVersionStatus
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { $, ValidationMaxLength, ValidationRequired } from '../../simpli'
import OaVersionStatusSchema from '../../schemas/OaVersionStatus.schema'
import { removeAccentsAndSpace } from '../../utils'

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
    return $.t(`slang.${this.$name}.${removeAccentsAndSpace(this.title)}`)
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
