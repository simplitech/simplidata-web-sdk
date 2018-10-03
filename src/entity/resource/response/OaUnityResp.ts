/**
 * OaUnityResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistOaUnity(model: OaUnity, spinner = 'persistOaUnity'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaUnity`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaUnity(id: number, spinner = 'getOaUnity'): Promise<Resp<OaUnityResp>> {
    const fetch = async () => await this.GET(`/User/OaUnity/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaUnity(id: number, spinner = 'removeOaUnity'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaUnity/${id}`)
    return await $.await.run(fetch, spinner)
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
