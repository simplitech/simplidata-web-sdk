/**
 * ObjectOfAnalysisResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'
import { ChartType } from '../ChartType'
import { OaCategory } from '../OaCategory'
import { OaPeriodicity } from '../OaPeriodicity'
import { OaSource } from '../OaSource'
import { OaUnity } from '../OaUnity'
import { Plan } from '../Plan'
import { User } from '../User'
import { Model } from '../Model'
import { ValueType } from '../ValueType'
import { OaGroup } from '../OaGroup'

/* TODO: review generated class */
export class ObjectOfAnalysisResp extends Resource {
  readonly $endpoint: string = '/User/ObjectOfAnalysis{/id}'

  get $id() {
    return this.objectOfAnalysis.$id
  }
  set $id(val: ID) {
    this.objectOfAnalysis.$id = val
  }
  get $tag() {
    return this.objectOfAnalysis.$tag
  }
  set $tag(val: TAG) {
    this.objectOfAnalysis.$tag = val
  }

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysis: ObjectOfAnalysis = new ObjectOfAnalysis()

  @ResponseSerialize(ChartType)
  allChartType: ChartType[] = []

  @ResponseSerialize(OaCategory)
  allOaCategory: OaCategory[] = []

  @ResponseSerialize(OaPeriodicity)
  allOaPeriodicity: OaPeriodicity[] = []

  @ResponseSerialize(OaSource)
  allOaSource: OaSource[] = []

  @ResponseSerialize(OaUnity)
  allOaUnity: OaUnity[] = []

  @ResponseSerialize(Plan)
  allPlan: Plan[] = []

  @ResponseSerialize(User)
  allUser: User[] = []

  @ResponseSerialize(Model)
  allModel: Model[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  @ResponseSerialize(ValueType)
  allValueType: ValueType[] = []

  @ResponseSerialize(OaGroup)
  allOaGroup: OaGroup[] = []

  async persistObjectOfAnalysis(model: ObjectOfAnalysis): Promise<Resp<Number>> {
    return await this.POST(`/User/ObjectOfAnalysis`, model)
  }

  async getObjectOfAnalysis(id: number): Promise<Resp<ObjectOfAnalysisResp>> {
    return await this.GET(`/User/ObjectOfAnalysis/${id}`)
  }

  async removeObjectOfAnalysis(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/ObjectOfAnalysis/${id}`)
  }

  scheme() {
    return {
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
    }
  }

  csvScheme() {
    return {
      objectOfAnalysis: this.objectOfAnalysis && this.objectOfAnalysis.$id,
    }
  }
}
