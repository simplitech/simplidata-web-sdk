/**
 * Plan
 * @author Simpli© CLI generator
 */
import { ID, Resource, ResponseSerialize, TAG, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { PagarmePlan } from '../pagarme/PagarmePlan'
import { PlanID } from '../../enums/PlanID'
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
    this.idPlanPk = val as PlanID
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  @ResponseSerialize(PagarmePlan)
  pagarmePlan: PagarmePlan = new PagarmePlan()

  idPlanPk: PlanID = PlanID.NO_PLAN

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  @ValidationMaxLength(255)
  gatewayId: string = ''

  @ValidationRequired()
  active: boolean = false
}
