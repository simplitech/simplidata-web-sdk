/**
 * OaDataResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaData } from '../OaData'
import { OaDataset } from '../OaDataset'

/* TODO: review generated class */
export class OaDataResp extends Resource {
  readonly $endpoint: string = '/User/OaData{/id}'

  get $id() {
    return this.oaData.$id
  }
  set $id(val: ID) {
    this.oaData.$id = val
  }
  get $tag() {
    return this.oaData.$tag
  }
  set $tag(val: TAG) {
    this.oaData.$tag = val
  }

  @ResponseSerialize(OaData)
  oaData: OaData = new OaData()

  @ResponseSerialize(OaDataset)
  allOaDataset: OaDataset[] = []

  async persistOaData(model: OaData): Promise<Resp<Number>> {
    return await this.POST(`/User/OaData`, model)
  }

  async getOaData(id: number): Promise<Resp<OaDataResp>> {
    return await this.GET(`/User/OaData/${id}`)
  }

  async removeOaData(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaData/${id}`)
  }

  scheme() {
    return {
      oaData: this.oaData && this.oaData.$id,
    }
  }

  csvScheme() {
    return {
      oaData: this.oaData && this.oaData.$id,
    }
  }
}
