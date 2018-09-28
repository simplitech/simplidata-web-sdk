/**
 * OaVersionStatusResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { OaVersionStatus } from '../OaVersionStatus'

/* TODO: review generated class */
export class OaVersionStatusResp extends Resource {
  readonly $endpoint: string = '/User/OaVersionStatus{/id}'

  get $id() {
    return this.oaVersionStatus.$id
  }
  set $id(val: ID) {
    this.oaVersionStatus.$id = val
  }
  get $tag() {
    return this.oaVersionStatus.$tag
  }
  set $tag(val: TAG) {
    this.oaVersionStatus.$tag = val
  }

  @ResponseSerialize(OaVersionStatus)
  oaVersionStatus: OaVersionStatus = new OaVersionStatus()

  async persistOaVersionStatus(model: OaVersionStatus): Promise<Resp<Number>> {
    return await this.POST(`/User/OaVersionStatus`, model)
  }

  async getOaVersionStatus(id: number): Promise<Resp<OaVersionStatusResp>> {
    return await this.GET(`/User/OaVersionStatus/${id}`)
  }

  async removeOaVersionStatus(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaVersionStatus/${id}`)
  }

  scheme() {
    return {
      oaVersionStatus: this.oaVersionStatus && this.oaVersionStatus.$id,
    }
  }

  csvScheme() {
    return {
      oaVersionStatus: this.oaVersionStatus && this.oaVersionStatus.$id,
    }
  }
}
