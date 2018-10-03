/**
 * NewsResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  async persistNews(model: News, spinner = 'persistNews'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/News`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getNews(id: number, spinner = 'getNews'): Promise<Resp<NewsResp>> {
    const fetch = async () => await this.GET(`/User/News/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeNews(id: number, spinner = 'removeNews'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/News/${id}`)
    return await $.await.run(fetch, spinner)
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
