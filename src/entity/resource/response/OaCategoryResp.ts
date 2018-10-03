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

  async persistOaCategory(model: OaCategory, spinner = 'persistOaCategory'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/OaCategory`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getOaCategory(id: number, spinner = 'getOaCategory'): Promise<Resp<OaCategoryResp>> {
    const fetch = async () => await this.GET(`/User/OaCategory/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async listOaCategory(query?: string, spinner = 'listOaCategory'): Promise<Resp<OaCategoryResp>> {
    const params = { query }
    const fetch = async () => await this.GET(`/User/OaCategory`, { params })
    return await $.await.run(fetch, spinner)
  }

  async removeOaCategory(id: number, spinner = 'removeOaCategory'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/OaCategory/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
