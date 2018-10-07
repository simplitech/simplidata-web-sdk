/**
 * ValueTypeResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
import { ValueType } from '../ValueType'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'

/* TODO: review generated class */
export class ValueTypeResp extends Resource {
  readonly $endpoint: string = '/User/ValueType{/id}'

  get $id() {
    return this.valueType.$id
  }
  set $id(val: ID) {
    this.valueType.$id = val
  }
  get $tag() {
    return this.valueType.$tag
  }
  set $tag(val: TAG) {
    this.valueType.$tag = val
  }

  @ResponseSerialize(ValueType)
  valueType: ValueType = new ValueType()

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistValueType(model: ValueType, spinner = 'persistValueType'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/ValueType`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getValueType(id: number, spinner = 'getValueType'): Promise<Resp<ValueTypeResp>> {
    const fetch = async () => await this.GET(`/User/ValueType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeValueType(id: number, spinner = 'removeValueType'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/ValueType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  scheme() {
    return {
      valueType: this.valueType && this.valueType.$id,
    }
  }

  csvScheme() {
    return {
      valueType: this.valueType && this.valueType.$id,
    }
  }
}
