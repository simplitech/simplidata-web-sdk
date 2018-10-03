/**
 * UserResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { User } from '../User'

export class UserResp extends Resource {
  readonly $endpoint: string = '/User/User{/id}'

  get $id() {
    return this.user.$id
  }
  set $id(val: ID) {
    this.user.$id = val
  }
  get $tag() {
    return this.user.$tag
  }
  set $tag(val: TAG) {
    this.user.$tag = val
  }

  @ResponseSerialize(User)
  user: User = new User()

  async persistUser(model: User, spinner = 'persistUser'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/User`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getUser(id: number, spinner = 'getUser'): Promise<Resp<UserResp>> {
    const fetch = async () => await this.GET(`/User/User/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeUser(id: number, spinner = 'removeUser'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/User/${id}`)
    return await $.await.run(fetch, spinner)
  }
}
