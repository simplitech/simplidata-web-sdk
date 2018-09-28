/**
 * MenuResp
 * @author Simpli© CLI generator
 */
import { Model, Resp, ResponseSerialize } from 'simpli-web-sdk'
import { OaCategory } from '../resource/OaCategory'
import { Collection } from '../resource/Collection'
import { ObjectOfAnalysis } from '../resource/ObjectOfAnalysis'

export class MenuResp extends Model {
  @ResponseSerialize(OaCategory)
  categories: OaCategory[] = []

  @ResponseSerialize(Collection)
  collections: Collection[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  recentObjectOfAnalysis: ObjectOfAnalysis[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  sentObjectOfAnalysis: ObjectOfAnalysis[] = []

  async getMenu(): Promise<Resp<MenuResp>> {
    return await this.GET(`/User/Menu`)
  }
}
