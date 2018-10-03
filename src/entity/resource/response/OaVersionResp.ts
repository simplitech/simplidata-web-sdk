/**
 * OaVersionResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  async persistOaVersion(model: OaVersion, spinner = 'persistOaVersion'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaVersion`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaVersion(id: number, spinner = 'getOaVersion'): Promise<Resp<OaVersionResp>> {
    const fetch = async () => await this.GET(`/User/OaVersion/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaVersion(id: number, spinner = 'removeOaVersion'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaVersion/${id}`)
    return await $.await.run(fetch, spinner)
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
