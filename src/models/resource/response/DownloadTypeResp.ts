/**
 * DownloadTypeResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { DownloadType } from '../DownloadType'

/* TODO: review generated class */
export class DownloadTypeResp extends Resource {
  readonly $endpoint: string = '/User/DownloadType{/id}'

  get $id() {
    return this.downloadType.$id
  }
  set $id(val: ID) {
    this.downloadType.$id = val
  }
  get $tag() {
    return this.downloadType.$tag
  }
  set $tag(val: TAG) {
    this.downloadType.$tag = val
  }

  @ResponseSerialize(DownloadType)
  downloadType: DownloadType = new DownloadType()

  async persistDownloadType(model: DownloadType, spinner = 'persistDownloadType'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/DownloadType`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getDownloadType(id: number, spinner = 'getDownloadType'): Promise<Resp<DownloadTypeResp>> {
    const fetch = async () => await this.GET(`/User/DownloadType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeDownloadType(id: number, spinner = 'removeDownloadType'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/DownloadType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      downloadType: this.downloadType && this.downloadType.$id,
    }
  }

  csvScheme() {
    return {
      downloadType: this.downloadType && this.downloadType.$id,
    }
  }
}
