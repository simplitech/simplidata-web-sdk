/**
 * DownloadType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool } from 'simpli-ts-vue'

/* TODO: review generated class */
export class DownloadType extends Resource {
  readonly $name: string = 'DownloadType'
  readonly $endpoint: string = '/User/DownloadType{/id}'

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

  @ValidationRequired() active: boolean = false

  scheme() {
    return {
      idDownloadTypePk: this.idDownloadTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idDownloadTypePk: this.idDownloadTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
