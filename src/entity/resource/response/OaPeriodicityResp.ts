/**
 * OaPeriodicityResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistOaPeriodicity(model: OaPeriodicity): Promise<Resp<Number>> {
    return await this.POST(`/User/OaPeriodicity`, model)
  }

  async getOaPeriodicity(id: number): Promise<Resp<OaPeriodicityResp>> {
    return await this.GET(`/User/OaPeriodicity/${id}`)
  }

  async removeOaPeriodicity(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaPeriodicity/${id}`)
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
