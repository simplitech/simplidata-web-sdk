/**
 * OaGroupResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaGroup } from '../OaGroup'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'

/* TODO: review generated class */
export class OaGroupResp extends Resource {
  readonly $endpoint: string = '/User/OaGroup{/id}'

  get $id() {
    return this.oaGroup.$id
  }
  set $id(val: ID) {
    this.oaGroup.$id = val
  }
  get $tag() {
    return this.oaGroup.$tag
  }
  set $tag(val: TAG) {
    this.oaGroup.$tag = val
  }

  @ResponseSerialize(OaGroup)
  oaGroup: OaGroup = new OaGroup()

  @ResponseSerialize(OaGroup)
  allOaGroup: OaGroup[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistOaGroup(model: OaGroup, spinner = 'persistOaGroup'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaGroup`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaGroup(id: number, spinner = 'getOaGroup'): Promise<Resp<OaGroupResp>> {
    const fetch = async () => await this.GET(`/User/OaGroup/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaGroup(id: number, spinner = 'removeOaGroup'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaGroup/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      oaGroup: this.oaGroup && this.oaGroup.$id,
    }
  }

  csvScheme() {
    return {
      oaGroup: this.oaGroup && this.oaGroup.$id,
    }
  }
}
