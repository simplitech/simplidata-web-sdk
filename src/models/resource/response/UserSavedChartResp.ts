/**
 * UserSavedChartResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { UserSavedChart } from '../UserSavedChart'
import { Collection } from '../Collection'
import { DownloadType } from '../DownloadType'
import { User } from '../User'

/* TODO: review generated class */
export class UserSavedChartResp extends Resource {
  readonly $endpoint: string = '/User/UserSavedChart{/id}'

  get $id() {
    return this.userSavedChart.$id
  }
  set $id(val: ID) {
    this.userSavedChart.$id = val
  }
  get $tag() {
    return this.userSavedChart.$tag
  }
  set $tag(val: TAG) {
    this.userSavedChart.$tag = val
  }

  @ResponseSerialize(UserSavedChart)
  userSavedChart: UserSavedChart = new UserSavedChart()

  @ResponseSerialize(Collection)
  allCollection: Collection[] = []

  @ResponseSerialize(DownloadType)
  allDownloadType: DownloadType[] = []

  @ResponseSerialize(User)
  allUser: User[] = []

  async persistUserSavedChart(model: UserSavedChart, spinner = 'persistUserSavedChart'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/UserSavedChart`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getUserSavedChart(id: number, spinner = 'getUserSavedChart'): Promise<Resp<UserSavedChartResp>> {
    const fetch = async () => await this.GET(`/User/UserSavedChart/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeUserSavedChart(id: number, spinner = 'removeUserSavedChart'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/UserSavedChart/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      userSavedChart: this.userSavedChart && this.userSavedChart.$id,
    }
  }

  csvScheme() {
    return {
      userSavedChart: this.userSavedChart && this.userSavedChart.$id,
    }
  }
}
