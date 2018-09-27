/**
 * OaPeriodicityResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  @ResponseSerialize(OaPeriodicity) oaPeriodicity: OaPeriodicity = new OaPeriodicity()

  async persistOaPeriodicity(model: OaPeriodicity): Promise<Resp<any>> {
    return await this.POST(`/User/OaPeriodicity`, model)
  }

  async getOaPeriodicity(id: number): Promise<Resp<any>> {
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
