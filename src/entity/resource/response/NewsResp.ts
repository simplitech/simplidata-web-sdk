/**
 * NewsResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { News } from '../News'
import { OaCategory } from '../OaCategory'

/* TODO: review generated class */
export class NewsResp extends Resource {
  readonly $endpoint: string = '/User/News{/id}'

  get $id() {
    return this.news.$id
  }
  set $id(val: ID) {
    this.news.$id = val
  }
  get $tag() {
    return this.news.$tag
  }
  set $tag(val: TAG) {
    this.news.$tag = val
  }

  @ResponseSerialize(News)
  news: News = new News()

  @ResponseSerialize(OaCategory)
  allOaCategory: OaCategory[] = []

  async persistNews(model: News): Promise<Resp<Number>> {
    return await this.POST(`/User/News`, model)
  }

  async getNews(id: number): Promise<Resp<NewsResp>> {
    return await this.GET(`/User/News/${id}`)
  }

  async removeNews(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/News/${id}`)
  }

  scheme() {
    return {
      news: this.news && this.news.$id,
    }
  }

  csvScheme() {
    return {
      news: this.news && this.news.$id,
    }
  }
}
