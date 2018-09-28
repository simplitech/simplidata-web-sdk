/**
 * OaGroupResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistOaGroup(model: OaGroup): Promise<Resp<Number>> {
    return await this.POST(`/User/OaGroup`, model)
  }

  async getOaGroup(id: number): Promise<Resp<OaGroupResp>> {
    return await this.GET(`/User/OaGroup/${id}`)
  }

  async removeOaGroup(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaGroup/${id}`)
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
