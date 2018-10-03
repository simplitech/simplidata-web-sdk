/**
 * PlanResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  @ResponseSerialize(Plan)
  plan: Plan = new Plan()

  async persistPlan(model: Plan, spinner = 'persistPlan'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/Plan`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getPlan(id: number, spinner = 'getPlan'): Promise<Resp<PlanResp>> {
    const fetch = async () => await this.GET(`/User/Plan/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removePlan(id: number, spinner = 'removePlan'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/Plan/${id}`)
    return await $.await.run(fetch, spinner)
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
