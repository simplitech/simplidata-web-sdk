/**
 * OaPeriodicity
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { ValidationMaxLength, ValidationRequired } from '../../simpli'
import OaPeriodicitySchema from '../../schemas/OaPeriodicity.schema'

/* TODO: review generated class */
export class OaPeriodicity extends Resource {
  readonly $name: string = 'OaPeriodicity'
  readonly $endpoint: string = '/User/OaPeriodicity{/id}'

  get $schema() {
    return OaPeriodicitySchema(this)
  }

  get $id() {
    return this.idOaPeriodicityPk
  }
  set $id(val: ID) {
    this.idOaPeriodicityPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idOaPeriodicityPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false
}
