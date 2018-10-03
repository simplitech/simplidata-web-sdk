/**
 * OaPeriodicityResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaPeriodicity } from '../OaPeriodicity'

/* TODO: review generated class */
export class OaPeriodicityResp extends Resource {
  readonly $endpoint: string = '/User/OaPeriodicity{/id}'

  get $id() {
    return this.oaPeriodicity.$id
  }
  set $id(val: ID) {
    this.oaPeriodicity.$id = val
  }
  get $tag() {
    return this.oaPeriodicity.$tag
  }
  set $tag(val: TAG) {
    this.oaPeriodicity.$tag = val
  }

  @ResponseSerialize(OaPeriodicity)
  oaPeriodicity: OaPeriodicity = new OaPeriodicity()

  async persistOaPeriodicity(model: OaPeriodicity, spinner = 'persistOaPeriodicity'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaPeriodicity`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaPeriodicity(id: number, spinner = 'getOaPeriodicity'): Promise<Resp<OaPeriodicityResp>> {
    const fetch = async () => await this.GET(`/User/OaPeriodicity/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaPeriodicity(id: number, spinner = 'removeOaPeriodicity'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaPeriodicity/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      oaPeriodicity: this.oaPeriodicity && this.oaPeriodicity.$id,
    }
  }

  csvScheme() {
    return {
      oaPeriodicity: this.oaPeriodicity && this.oaPeriodicity.$id,
    }
  }
}
