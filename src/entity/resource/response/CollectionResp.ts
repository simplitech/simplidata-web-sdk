/**
 * CollectionResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistCollection(model: Collection, spinner = 'persistCollection'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/Collection`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getCollection(id: number, spinner = 'getCollection'): Promise<Resp<CollectionResp>> {
    const fetch = async () => await this.GET(`/User/Collection/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeCollection(id: number, spinner = 'removeCollection'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/Collection/${id}`)
    return await $.await.run(fetch, spinner)
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
