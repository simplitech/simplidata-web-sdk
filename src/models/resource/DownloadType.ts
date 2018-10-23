/**
 * DownloadType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'

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

  @ValidationRequired()
  active: boolean = false

  scheme(): any {
    return {
      idDownloadTypePk: this.idDownloadTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      idDownloadTypePk: this.idDownloadTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
