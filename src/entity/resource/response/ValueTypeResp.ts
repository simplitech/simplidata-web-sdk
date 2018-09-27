/**
 * ValueTypeResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
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

  @ResponseSerialize(ValueType) valueType: ValueType = new ValueType()

  @ResponseSerialize(ObjectOfAnalysis) allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistValueType(model: ValueType): Promise<Resp<any>> {
    return await this.POST(`/User/ValueType`, model)
  }

  async getValueType(id: number): Promise<Resp<any>> {
    return await this.GET(`/User/ValueType/${id}`)
  }

  async removeValueType(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/ValueType/${id}`)
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
