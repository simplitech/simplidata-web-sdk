/**
 * OaVersionStatusResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  async persistOaVersionStatus(model: OaVersionStatus, spinner = 'persistOaVersionStatus'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaVersionStatus`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaVersionStatus(id: number, spinner = 'getOaVersionStatus'): Promise<Resp<OaVersionStatusResp>> {
    const fetch = async () => await this.GET(`/User/OaVersionStatus/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaVersionStatus(id: number, spinner = 'removeOaVersionStatus'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaVersionStatus/${id}`)
    return await $.await.run(fetch, spinner)
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
