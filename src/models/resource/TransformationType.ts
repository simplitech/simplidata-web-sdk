/**
 * TransformationType
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
import TransformationTypeSchema from '../../schemas/TransformationType.schema'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'

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

  get titleWithCombiner() {
    const combinerStr =
      !this.combineWith || !this.combineWith.objectOfAnalysis ? '' : `: ${this.combineWith.objectOfAnalysis.title}`
    return this.title + combinerStr
  }

  idTransformationTypePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  combiner: boolean = false

  @ValidationRequired()
  active: boolean = false

  combineWith: ObjectOfAnalysisRFU | null = null
}
