/**
 * UserSavedChartResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  @ResponseSerialize(UserSavedChart) userSavedChart: UserSavedChart = new UserSavedChart()

  @ResponseSerialize(Collection) allCollection: Collection[] = []

  @ResponseSerialize(DownloadType) allDownloadType: DownloadType[] = []

  @ResponseSerialize(User) allUser: User[] = []

  async persistUserSavedChart(model: UserSavedChart): Promise<Resp<any>> {
    return await this.POST(`/User/UserSavedChart`, model)
  }

  async getUserSavedChart(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/UserSavedChart/${id}`)
  }

  async removeUserSavedChart(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/UserSavedChart/${id}`)
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
