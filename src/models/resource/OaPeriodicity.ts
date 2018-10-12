/**
 * OaPeriodicity
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'

/* TODO: review generated class */
export class OaPeriodicity extends Resource {
  readonly $name: string = 'OaPeriodicity'
  readonly $endpoint: string = '/User/OaPeriodicity{/id}'

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

  scheme() {
    return {
      idOaPeriodicityPk: this.idOaPeriodicityPk,
      title: this.title,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idOaPeriodicityPk: this.idOaPeriodicityPk,
      title: this.title,
      active: bool(this.active),
    }
  }
}