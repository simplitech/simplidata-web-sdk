/**
 * DownloadType
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { $, ValidationMaxLength, ValidationRequired } from '../../simpli'
import DownloadTypeSchema from '../../schemas/DownloadType.schema'
import { removeAccentsAndSpace } from '../../utils'

export class DownloadType extends Resource {
  readonly $name: string = 'DownloadType'
  readonly $endpoint: string = '/User/DownloadType{/id}'

  static XLS = 1

  get $schema() {
    return DownloadTypeSchema(this)
  }

  get $id() {
    return this.idDownloadTypePk
  }
  set $id(val: ID) {
    this.idDownloadTypePk = val
  }
  get $tag() {
    return $.t(`slang.${this.$name}.${removeAccentsAndSpace(this.title)}`)
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idDownloadTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
