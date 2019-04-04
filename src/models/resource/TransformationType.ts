/**
 * TransformationType
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { $, ValidationMaxLength, ValidationRequired } from '../../simpli'
import TransformationTypeSchema from '../../schemas/TransformationType.schema'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'
import { removeAccentsAndSpace } from '../../utils'
import { Exclude } from 'class-transformer'

export class TransformationType extends Resource {
  @Exclude({ toPlainOnly: true })
  readonly $name: string = 'TransformationType'
  @Exclude({ toPlainOnly: true })
  readonly $endpoint: string = '/User/TransformationType{/id}'

  @Exclude({ toPlainOnly: true })
  get $schema() {
    return TransformationTypeSchema(this)
  }

  @Exclude({ toPlainOnly: true })
  get $id() {
    return this.idTransformationTypePk
  }
  set $id(val: ID) {
    this.idTransformationTypePk = val
  }

  @Exclude({ toPlainOnly: true })
  get $tag() {
    return $.t(`slang.${this.$name}.${removeAccentsAndSpace(this.title)}`)
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @Exclude({ toPlainOnly: true })
  get tagWithCombiner() {
    const combinerStr =
      !this.combineWith || !this.combineWith.objectOfAnalysis ? '' : `: ${this.combineWith.objectOfAnalysis.title}`
    return this.$tag + combinerStr
  }

  @Exclude({ toPlainOnly: true })
  get combinerSymbol() {
    return !this.combiner ? '' : $.t(`slang.combinerSymbol.${removeAccentsAndSpace(this.title)}`)
  }

  idTransformationTypePk: ID = 0

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  combiner: boolean = false

  @Exclude({ toPlainOnly: true })
  @ValidationRequired()
  active: boolean = false

  @Exclude({ toPlainOnly: true })
  combineWith: ObjectOfAnalysisRFU | null = null
}
