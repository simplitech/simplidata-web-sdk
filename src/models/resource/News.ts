/**
 * News
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { AnchorRender, bool, datetime } from 'simpli-web-sdk'
// import {OaCategory} from './OaCategory'

/* TODO: review generated class */
export class News extends Resource {
  readonly $name: string = 'News'
  readonly $endpoint: string = '/User/News{/id}'

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

  @ValidationRequired()
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

  scheme(): any {
    return {
      // oaCategory: this.oaCategory && this.oaCategory.$id,
      idNewsPk: this.idNewsPk,
      title: this.title,
      link: new AnchorRender(this.link, this.link, '_blank').toHtml(),
      dataCreation: datetime(this.dataCreation),
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      // oaCategory: this.oaCategory && this.oaCategory.$id,
      idNewsPk: this.idNewsPk,
      title: this.title,
      link: this.link,
      dataCreation: datetime(this.dataCreation),
      active: bool(this.active),
    }
  }
}
