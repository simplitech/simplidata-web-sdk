/**
 * TransformationTypeResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { TransformationType } from '../TransformationType'

/* TODO: review generated class */
export class TransformationTypeResp extends Resource {
  readonly $endpoint: string = '/User/TransformationType{/id}'

  get $id() {
    return this.transformationType.$id
  }
  set $id(val: ID) {
    this.transformationType.$id = val
  }
  get $tag() {
    return this.transformationType.$tag
  }
  set $tag(val: TAG) {
    this.transformationType.$tag = val
  }

  @ResponseSerialize(TransformationType)
  transformationType: TransformationType = new TransformationType()

  async persistTransformationType(model: TransformationType): Promise<Resp<Number>> {
    return await this.POST(`/User/TransformationType`, model)
  }

  async getTransformationType(id: number): Promise<Resp<TransformationTypeResp>> {
    return await this.GET(`/User/TransformationType/${id}`)
  }

  async removeTransformationType(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/TransformationType/${id}`)
  }

  scheme() {
    return {
      transformationType: this.transformationType && this.transformationType.$id,
    }
  }

  csvScheme() {
    return {
      transformationType: this.transformationType && this.transformationType.$id,
    }
  }
}
