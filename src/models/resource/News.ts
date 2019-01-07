/**
 * News
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
// import {OaCategory} from './OaCategory'
import NewsSchema from '../../schemas/News.schema'

/* TODO: review generated class */
export class News extends Resource {
  readonly $name: string = 'News'
  readonly $endpoint: string = '/User/News{/id}'

  get $schema() {
    return NewsSchema(this)
  }

  get $id() {
    return this.idNewsPk
  }
  set $id(val: ID) {
    this.idNewsPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  // @ResponseSerialize(OaCategory)
  // oaCategory: OaCategory | null = null

  idNewsPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  link: string = ''

  dataCreation: string = ''

  @ValidationRequired()
  active: boolean = false

  // get idOaCategoryFk() {
  //   if (!this.oaCategory) return 0
  //   return this.oaCategory.$id
  // }
  // set idOaCategoryFk(idOaCategoryFk: ID) {
  //   if (!this.oaCategory) this.oaCategory = new OaCategory()
  //   this.oaCategory.$id = idOaCategoryFk
  // }
}
