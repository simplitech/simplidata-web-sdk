/**
 * ChartTypeResp
 * @author Simpli© CLI generator
 */
import { ID, Resource, Resp, TAG } from 'simpli-ts-vue'
import { ResponseSerialize } from 'simpli-ts-vue'
import { ChartType } from '../ChartType'
import { ObjectOfAnalysis } from '../ObjectOfAnalysis'

/* TODO: review generated class */
export class ChartTypeResp extends Resource {
  readonly $endpoint: string = '/User/ChartType{/id}'

  get $id() {
    return this.chartType.$id
  }
  set $id(val: ID) {
    this.chartType.$id = val
  }
  get $tag() {
    return this.chartType.$tag
  }
  set $tag(val: TAG) {
    this.chartType.$tag = val
  }

  @ResponseSerialize(ChartType)
  chartType: ChartType = new ChartType()

  @ResponseSerialize(ObjectOfAnalysis)
  allObjectOfAnalysis: ObjectOfAnalysis[] = []

  async persistChartType(model: ChartType): Promise<Resp<Number>> {
    return await this.POST(`/User/ChartType`, model)
  }

  async getChartType(id: number): Promise<Resp<ChartTypeResp>> {
    return await this.GET(`/User/ChartType/${id}`)
  }

  async removeChartType(id: number): Promise<Resp<any>> {
    return await this.DELETE(`/User/ChartType/${id}`)
  }

  scheme() {
    return {
      chartType: this.chartType && this.chartType.$id,
    }
  }

  csvScheme() {
    return {
      chartType: this.chartType && this.chartType.$id,
    }
  }
}
