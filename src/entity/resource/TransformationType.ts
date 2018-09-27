/**
 * TransformationType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool } from 'simpli-ts-vue'

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

  @ValidationRequired() active: boolean = false

  scheme() {
    return {
      idTransformationTypePk: this.idTransformationTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idTransformationTypePk: this.idTransformationTypePk,
      title: this.title,
      active: bool(this.active),
    }
  }
}
