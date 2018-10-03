/**
 * OaDatasetResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaDataset } from '../OaDataset'
import { OaVersion } from '../OaVersion'

/* TODO: review generated class */
export class OaDatasetResp extends Resource {
  readonly $endpoint: string = '/User/OaDataset{/id}'

  get $id() {
    return this.oaDataset.$id
  }
  set $id(val: ID) {
    this.oaDataset.$id = val
  }
  get $tag() {
    return this.oaDataset.$tag
  }
  set $tag(val: TAG) {
    this.oaDataset.$tag = val
  }

  @ResponseSerialize(OaDataset)
  oaDataset: OaDataset = new OaDataset()

  @ResponseSerialize(OaVersion)
  allOaVersion: OaVersion[] = []

  async persistOaDataset(model: OaDataset, spinner = 'persistOaDataset'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaDataset`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaDataset(id: number, spinner = 'getOaDataset'): Promise<Resp<OaDatasetResp>> {
    const fetch = async () => await this.GET(`/User/OaDataset/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaDataset(id: number, spinner = 'removeOaDataset'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaDataset/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      oaDataset: this.oaDataset && this.oaDataset.$id,
    }
  }

  csvScheme() {
    return {
      oaDataset: this.oaDataset && this.oaDataset.$id,
    }
  }
}
