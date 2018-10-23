/**
 * Plan
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool } from 'simpli-web-sdk'

/* TODO: review generated class */
export class Plan extends Resource {
  readonly $name: string = 'Plan'
  readonly $endpoint: string = '/User/Plan{/id}'

  get $id() {
    return this.idPlanPk
  }
  set $id(val: ID) {
    this.idPlanPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idPlanPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  gatewayId: string = ''

  @ValidationRequired()
  active: boolean = false

  scheme(): any {
    return {
      idPlanPk: this.idPlanPk,
      title: this.title,
      gatewayId: this.gatewayId,
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      idPlanPk: this.idPlanPk,
      title: this.title,
      gatewayId: this.gatewayId,
      active: bool(this.active),
    }
  }
}
