/**
 * MenuResponse
 * @author Simpli CLI generator
 */
import { $, Model, Resp, ResponseSerialize } from '../../simpli'
import { OaCategory } from '../resource/OaCategory'
import { Collection } from '../resource/Collection'
import { ObjectOfAnalysis } from '../resource/ObjectOfAnalysis'

export class MenuResponse extends Model {
  readonly $name: string = 'MenuResponse'

  @ResponseSerialize(OaCategory)
  categories: OaCategory[] = []

  @ResponseSerialize(Collection)
  collections: Collection[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  recentObjectOfAnalysis: ObjectOfAnalysis[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  sentObjectOfAnalysis: ObjectOfAnalysis[] = []

  async getMenu(spinner = 'getMenu'): Promise<Resp<MenuResponse>> {
    const fetch = async () => await this.GET(`/User/Menu`)
    return await $.await.run(fetch, spinner)
  }

  async getMenuPublic(spinner = 'getMenu'): Promise<Resp<MenuResponse>> {
    const fetch = async () => await this.GET(`/User/MenuPublic`)
    return await $.await.run(fetch, spinner)
  }
}
