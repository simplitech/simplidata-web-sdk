/**
 * OaSource
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { AnchorRender, bool } from 'simpli-ts-vue'

/* TODO: review generated class */
export class OaSource extends Resource {
  readonly $name: string = 'OaSource'
  readonly $endpoint: string = '/User/OaSource{/id}'

  get $id() {
    return this.idSourcePk
  }
  set $id(val: ID) {
    this.idSourcePk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idSourcePk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  link: string = ''

  @ValidationRequired() active: boolean = false

  scheme() {
    return {
      idSourcePk: this.idSourcePk,
      title: this.title,
      link: new AnchorRender(this.link, this.link, '_blank').toHtml(),
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idSourcePk: this.idSourcePk,
      title: this.title,
      link: this.link,
      active: bool(this.active),
    }
  }
}
