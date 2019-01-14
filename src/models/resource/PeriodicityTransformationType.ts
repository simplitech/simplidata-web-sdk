/**
 * PeriodicityTransformationType
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
import PeriodicityTransformationTypeSchema from '../../schemas/PeriodicityTransformationType.schema'

export class PeriodicityTransformationType extends Resource {
  readonly $name: string = 'PeriodicityTransformationType'
  readonly $endpoint: string = '/User/PeriodicityTransformationType{/id}'

  get $schema() {
    return PeriodicityTransformationTypeSchema(this)
  }

  get $id() {
    return this.idPeriodicityTransformationTypePk
  }
  set $id(val: ID) {
    this.idPeriodicityTransformationTypePk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idPeriodicityTransformationTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
