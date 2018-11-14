/**
 * DownloadType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import DownloadTypeSchema from '../../schemas/DownloadType.schema'

/* TODO: review generated class */
export class DownloadType extends Resource {
  readonly $name: string = 'DownloadType'
  readonly $endpoint: string = '/User/DownloadType{/id}'

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
    return this.title
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
