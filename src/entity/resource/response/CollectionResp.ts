/**
 * CollectionResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { Collection } from '../Collection'
import { User } from '../User'

/* TODO: review generated class */
export class CollectionResp extends Resource {
  readonly $endpoint: string = '/User/Collection{/id}'

  get $id() {
    return this.collection.$id
  }
  set $id(val: ID) {
    this.collection.$id = val
  }
  get $tag() {
    return this.collection.$tag
  }
  set $tag(val: TAG) {
    this.collection.$tag = val
  }

  @ResponseSerialize(Collection)
  collection: Collection = new Collection()

  @ResponseSerialize(User)
  allUser: User[] = []

  async persistCollection(model: Collection): Promise<Resp<Number>> {
    return await this.POST(`/User/Collection`, model)
  }

  async getCollection(id: number): Promise<Resp<CollectionResp>> {
    return await this.GET(`/User/Collection/${id}`)
  }

  async removeCollection(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/Collection/${id}`)
  }

  scheme() {
    return {
      collection: this.collection && this.collection.$id,
    }
  }

  csvScheme() {
    return {
      collection: this.collection && this.collection.$id,
    }
  }
}
