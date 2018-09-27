/**
 * OaDatasetResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  @ResponseSerialize(OaDataset) oaDataset: OaDataset = new OaDataset()

  @ResponseSerialize(OaVersion) allOaVersion: OaVersion[] = []

  async persistOaDataset(model: OaDataset): Promise<Resp<any>> {
    return await this.POST(`/User/OaDataset`, model)
  }

  async getOaDataset(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/OaDataset/${id}`)
  }

  async removeOaDataset(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaDataset/${id}`)
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
