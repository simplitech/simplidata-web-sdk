/**
 * OaCategory
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired, ResponseSerialize } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { News } from './News'
import OaCategorySchema from '../../schemas/OaCategory.schema'

export class OaCategory extends Resource {
  readonly $name: string = 'OaCategory'
  readonly $endpoint: string = '/User/OaCategory{/id}'

  get $schema() {
    return OaCategorySchema(this)
  }

  get $id() {
    return this.idOaCategoryPk
  }
  set $id(val: ID) {
    this.idOaCategoryPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idOaCategoryPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  @ResponseSerialize(ObjectOfAnalysis)
  objectsOfAnalysis: ObjectOfAnalysis[] = []

  @ResponseSerialize(News)
  news: News[] = []
}
