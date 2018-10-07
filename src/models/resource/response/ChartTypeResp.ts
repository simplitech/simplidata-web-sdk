/**
 * ChartTypeResp
 * @author Simpli© CLI generator
 */
import { $, ID, Resource, Resp, TAG } from 'simpli-web-sdk'
import { ResponseSerialize } from 'simpli-web-sdk'
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

  async persistChartType(model: ChartType, spinner = 'persistChartType'): Promise<Resp<Number>> {
    const fetch = async () => {
      await model.validate()
      return await this.POST(`/User/ChartType`, model)
    }
    return await $.await.run(fetch, spinner)
  }

  async getChartType(id: number, spinner = 'getChartType'): Promise<Resp<ChartTypeResp>> {
    const fetch = async () => await this.GET(`/User/ChartType/${id}`)
    return await $.await.run(fetch, spinner)
  }

  async removeChartType(id: number, spinner = 'removeChartType'): Promise<Resp<any>> {
    const fetch = async () => await this.DELETE(`/User/ChartType/${id}`)
    return await $.await.run(fetch, spinner)
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
