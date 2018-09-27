/**
 * OaCategoryResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { OaCategory } from '../OaCategory'

export class OaCategoryResp extends Resource {
  readonly $endpoint: string = '/User/OaCategory{/id}'

  get $id() {
    return 0
  }

  set $id(val: ID) {
    /**/
  }

  @ResponseSerialize(OaCategory) categories: OaCategory[] = []

  async persistOaCategory(model: OaCategory): Promise<Resp<any>> {
    return await this.POST(`/User/OaCategory`, model)
  }

  async getOaCategory(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/OaCategory/${id}`)
  }

  async listOaCategory(query?: string): Promise<Resp<any>> {
    const params = { query }
    const fetch = async () => await this.GET(`/User/OaCategory`, { params })
    return await $.await.run(fetch, 'listOaCategory')
  }

  async removeOaCategory(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaCategory/${id}`)
  }
}
