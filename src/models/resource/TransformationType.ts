/**
 * TransformationType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import TransformationTypeSchema from '../../schemas/TransformationType.schema'

export class TransformationType extends Resource {
  readonly $name: string = 'TransformationType'
  readonly $endpoint: string = '/User/TransformationType{/id}'

  get $schema() {
    return TransformationTypeSchema(this)
  }

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
}
