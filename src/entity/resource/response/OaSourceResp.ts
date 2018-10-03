/**
 * OaSourceResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaSource } from '../OaSource'

/* TODO: review generated class */
export class OaSourceResp extends Resource {
  readonly $endpoint: string = '/User/OaSource{/id}'

  get $id() {
    return this.oaSource.$id
  }
  set $id(val: ID) {
    this.oaSource.$id = val
  }
  get $tag() {
    return this.oaSource.$tag
  }
  set $tag(val: TAG) {
    this.oaSource.$tag = val
  }

  @ResponseSerialize(OaSource)
  oaSource: OaSource = new OaSource()

  async persistOaSource(model: OaSource, spinner = 'persistOaSource'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaSource`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaSource(id: number, spinner = 'getOaSource'): Promise<Resp<OaSourceResp>> {
    const fetch = async () => await this.GET(`/User/OaSource/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaSource(id: number, spinner = 'removeOaSource'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaSource/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      oaSource: this.oaSource && this.oaSource.$id,
    }
  }

  csvScheme() {
    return {
      oaSource: this.oaSource && this.oaSource.$id,
    }
  }
}
