/**
 * OaCategoryResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { OaCategory } from '../OaCategory'

export class OaCategoryResp extends Resource {
  readonly $endpoint: string = '/User/OaCategory{/id}'

  get $id() {
    return 0
  }

  set $id(val: ID) {
    /**/
  }

  @ResponseSerialize(OaCategory)
  category: OaCategory | null = null

  @ResponseSerialize(OaCategory)
  categories: OaCategory[] = []

  async persistOaCategory(model: OaCategory): Promise<Resp<Number>> {
    return await this.POST(`/User/OaCategory`, model)
  }

  async getOaCategory(id: number): Promise<Resp<OaCategoryResp>> {
    return await this.GET(`/User/OaCategory/${id}`)
  }

  async listOaCategory(query?: string): Promise<Resp<OaCategoryResp>> {
    const params = { query }
    return await this.GET(`/User/OaCategory`, { params })
  }

  async removeOaCategory(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/OaCategory/${id}`)
  }
}
