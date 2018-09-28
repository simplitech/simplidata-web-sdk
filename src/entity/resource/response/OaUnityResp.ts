/**
 * OaUnityResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaUnity } from '../OaUnity'

/* TODO: review generated class */
export class OaUnityResp extends Resource {
  readonly $endpoint: string = '/User/OaUnity{/id}'

  get $id() {
    return this.oaUnity.$id
  }
  set $id(val: ID) {
    this.oaUnity.$id = val
  }
  get $tag() {
    return this.oaUnity.$tag
  }
  set $tag(val: TAG) {
    this.oaUnity.$tag = val
  }

  @ResponseSerialize(OaUnity)
  oaUnity: OaUnity = new OaUnity()

  async persistOaUnity(model: OaUnity): Promise<Resp<Number>> {
    return await this.POST(`/User/OaUnity`, model)
  }

  async getOaUnity(id: number): Promise<Resp<OaUnityResp>> {
    return await this.GET(`/User/OaUnity/${id}`)
  }

  async removeOaUnity(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaUnity/${id}`)
  }

  scheme() {
    return {
      oaUnity: this.oaUnity && this.oaUnity.$id,
    }
  }

  csvScheme() {
    return {
      oaUnity: this.oaUnity && this.oaUnity.$id,
    }
  }
}
