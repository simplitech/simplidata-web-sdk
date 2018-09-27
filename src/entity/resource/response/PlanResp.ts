/**
 * PlanResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { Plan } from '../Plan'

/* TODO: review generated class */
export class PlanResp extends Resource {
  readonly $endpoint: string = '/User/Plan{/id}'

  get $id() {
    return this.plan.$id
  }
  set $id(val: ID) {
    this.plan.$id = val
  }
  get $tag() {
    return this.plan.$tag
  }
  set $tag(val: TAG) {
    this.plan.$tag = val
  }

  @ResponseSerialize(Plan) plan: Plan = new Plan()

  async persistPlan(model: Plan): Promise<Resp<any>> {
    return await this.POST(`/User/Plan`, model)
  }

  async getPlan(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/Plan/${id}`)
  }

  async removePlan(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/Plan/${id}`)
  }

  scheme() {
    return {
      plan: this.plan && this.plan.$id,
    }
  }

  csvScheme() {
    return {
      plan: this.plan && this.plan.$id,
    }
  }
}
