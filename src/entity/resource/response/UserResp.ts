/**
 * UserResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  async persistUser(model: User): Promise<Resp<Number>> {
    return await this.POST(`/User/User`, model)
  }

  async getUser(id: number): Promise<Resp<UserResp>> {
    return await this.GET(`/User/User/${id}`)
  }

  async removeUser(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/User/${id}`)
  }
}
