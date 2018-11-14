/**
 * Plan
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import PlanSchema from '../../schemas/Plan.schema'

/* TODO: review generated class */
export class Plan extends Resource {
  readonly $name: string = 'Plan'
  readonly $endpoint: string = '/User/Plan{/id}'

  get $schema() {
    return PlanSchema(this)
  }

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
}
