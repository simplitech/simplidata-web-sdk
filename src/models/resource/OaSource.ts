/**
 * OaSource
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired, ValidationMatches } from '../../simpli'
import OaSourceSchema from '../../schemas/OaSource.schema'

export class OaSource extends Resource {
  readonly $name: string = 'OaSource'
  readonly $endpoint: string = '/User/OaSource{/id}'

  get $schema() {
    return OaSourceSchema(this)
  }

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
  @ValidationMatches(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)
  link: string = ''

  @ValidationRequired()
  active: boolean = false
}
