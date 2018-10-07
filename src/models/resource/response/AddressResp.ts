/**
 * AddressResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { Address } from '../Address'

/* TODO: review generated class */
export class AddressResp extends Resource {
  readonly $endpoint: string = '/User/Address{/id}'

  get $id() {
    return this.address.$id
  }
  set $id(val: ID) {
    this.address.$id = val
  }
  get $tag() {
    return this.address.$tag
  }
  set $tag(val: TAG) {
    this.address.$tag = val
  }

  @ResponseSerialize(Address)
  address: Address = new Address()

  async persistAddress(model: Address, spinner = 'persistAddress'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/Address`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getAddress(id: number, spinner = 'getAddress'): Promise<Resp<AddressResp>> {
    const fetch = async () => await this.GET(`/User/Address/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeAddress(id: number, spinner = 'removeAddress'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/Address/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      address: this.address && this.address.$id,
    }
  }

  csvScheme() {
    return {
      address: this.address && this.address.$id,
    }
  }
}
