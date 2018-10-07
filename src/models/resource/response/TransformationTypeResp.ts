/**
 * TransformationTypeResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
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

  async persistTransformationType(
    model: TransformationType,
    spinner = 'persistTransformationType'
  ): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/TransformationType`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getTransformationType(id: number, spinner = 'getTransformationType'): Promise<Resp<TransformationTypeResp>> {
    const fetch = async () => await this.GET(`/User/TransformationType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeTransformationType(id: number, spinner = 'removeTransformationType'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/TransformationType/${id}`)
    return await $.await.run(fetch, spinner)
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
