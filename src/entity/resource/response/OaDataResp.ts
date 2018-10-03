/**
 * OaDataResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistOaData(model: OaData, spinner = 'persistOaData'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaData`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaData(id: number, spinner = 'getOaData'): Promise<Resp<OaDataResp>> {
    const fetch = async () => await this.GET(`/User/OaData/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeOaData(id: number, spinner = 'removeOaData'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaData/${id}`)
    return await $.await.run(fetch, spinner)
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
