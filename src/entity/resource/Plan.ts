/**
 * Plan
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-ts-vue'
import { ValidationMaxLength, ValidationRequired } from 'simpli-ts-vue'
import { bool } from 'simpli-ts-vue'

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

  @ValidationRequired() active: boolean = false

  scheme() {
    return {
      idPlanPk: this.idPlanPk,
      title: this.title,
      gatewayId: this.gatewayId,
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      idPlanPk: this.idPlanPk,
      title: this.title,
      gatewayId: this.gatewayId,
      active: bool(this.active),
    }
  }
}
