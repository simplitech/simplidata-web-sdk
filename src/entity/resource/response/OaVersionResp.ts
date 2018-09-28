/**
 * OaVersionResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { OaVersion } from '../OaVersion'
import { OaVersionStatus } from '../OaVersionStatus'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'

/* TODO: review generated class */
export class OaVersionResp extends Resource {
  readonly $endpoint: string = '/User/OaVersion{/id}'

  get $id() {
    return this.oaVersion.$id
  }
  set $id(val: ID) {
    this.oaVersion.$id = val
  }
  get $tag() {
    return this.oaVersion.$tag
  }
  set $tag(val: TAG) {
    this.oaVersion.$tag = val
  }

  @ResponseSerialize(OaVersion)
  oaVersion: OaVersion = new OaVersion()

  @ResponseSerialize(OaVersionStatus)
  allOaVersionStatus: OaVersionStatus[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistOaVersion(model: OaVersion): Promise<Resp<Number>> {
    return await this.POST(`/User/OaVersion`, model)
  }

  async getOaVersion(id: number): Promise<Resp<OaVersionResp>> {
    return await this.GET(`/User/OaVersion/${id}`)
  }

  async removeOaVersion(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaVersion/${id}`)
  }

  scheme() {
    return {
      oaVersion: this.oaVersion && this.oaVersion.$id,
    }
  }

  csvScheme() {
    return {
      oaVersion: this.oaVersion && this.oaVersion.$id,
    }
  }
}
