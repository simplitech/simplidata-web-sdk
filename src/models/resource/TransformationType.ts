/**
 * TransformationType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'

/* TODO: review generated class */
export class TransformationType extends Resource {
  readonly $name: string = 'TransformationType'
  readonly $endpoint: string = '/User/TransformationType{/id}'

  get $id() {
    return this.idTransformationTypePk
  }
  set $id(val: ID) {
    this.idTransformationTypePk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idTransformationTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  scheme(): any {
    return {
      idTransformationTypePk: this.idTransformationTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      idTransformationTypePk: this.idTransformationTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
