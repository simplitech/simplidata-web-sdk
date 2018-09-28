/**
 * OaSourceResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  async persistOaSource(model: OaSource): Promise<Resp<Number>> {
    return await this.POST(`/User/OaSource`, model)
  }

  async getOaSource(id: number): Promise<Resp<OaSourceResp>> {
    return await this.GET(`/User/OaSource/${id}`)
  }

  async removeOaSource(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaSource/${id}`)
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
