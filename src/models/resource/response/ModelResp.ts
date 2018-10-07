/**
 * ModelResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { Model } from '../Model'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'

/* TODO: review generated class */
export class ModelResp extends Resource {
  readonly $endpoint: string = '/User/Model{/id}'

  get $id() {
    return this.model.$id
  }
  set $id(val: ID) {
    this.model.$id = val
  }
  get $tag() {
    return this.model.$tag
  }
  set $tag(val: TAG) {
    this.model.$tag = val
  }

  @ResponseSerialize(Model)
  model: Model = new Model()

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistModel(model: Model, spinner = 'persistModel'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/Model`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getModel(id: number, spinner = 'getModel'): Promise<Resp<ModelResp>> {
    const fetch = async () => await this.GET(`/User/Model/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeModel(id: number, spinner = 'removeModel'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/Model/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      model: this.model && this.model.$id,
    }
  }

  csvScheme() {
    return {
      model: this.model && this.model.$id,
    }
  }
}
