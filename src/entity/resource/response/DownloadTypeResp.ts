/**
 * DownloadTypeResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  @ResponseSerialize(DownloadType) downloadType: DownloadType = new DownloadType()

  async persistDownloadType(model: DownloadType): Promise<Resp<any>> {
    return await this.POST(`/User/DownloadType`, model)
  }

  async getDownloadType(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/DownloadType/${id}`)
  }

  async removeDownloadType(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/DownloadType/${id}`)
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
