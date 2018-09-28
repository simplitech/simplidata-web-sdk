/**
 * AddressResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistAddress(model: Address): Promise<Resp<Number>> {
    return await this.POST(`/User/Address`, model)
  }

  async getAddress(id: number): Promise<Resp<AddressResp>> {
    return await this.GET(`/User/Address/${id}`)
  }

  async removeAddress(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/Address/${id}`)
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
