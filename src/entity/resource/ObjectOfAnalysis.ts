/**
 * ObjectOfAnalysis
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { ChartType } from './ChartType'
// import {OaCategory} from './OaCategory'
import { OaPeriodicity } from './OaPeriodicity'
import { OaSource } from './OaSource'
import { OaUnity } from './OaUnity'
import { OaVersion } from './OaVersion'
import { Plan } from './Plan'
import { User } from './User'
import { Model } from './Model'
import { ValueType } from './ValueType'
import { OaGroup } from './OaGroup'

/* TODO: review generated class */
export class ObjectOfAnalysis extends Resource {
  static $placeholder: string = 'img/placeholder/graph.png'

  readonly $name: string = 'ObjectOfAnalysis'
  readonly $endpoint: string = '/User/ObjectOfAnalysis{/id}'

  get $id() {
    return this.idObjectOfAnalysisPk
  }
  set $id(val: ID) {
    this.idObjectOfAnalysisPk = val
  }
  get $tag() {
    return this.title
  }
  set $tag(val: TAG) {
    this.title = val
  }

  get $thumbnail() {
    return this.urlThumbnail || ObjectOfAnalysis.$placeholder
  }

  @ResponseSerialize(ChartType)
  recommendedChart: ChartType | null = null

  // @ResponseSerialize(OaCategory)
  // category: OaCategory | null = null

  @ResponseSerialize(OaPeriodicity)
  periodicity: OaPeriodicity | null = null

  @ResponseSerialize(OaSource)
  source: OaSource | null = null

  @ResponseSerialize(OaUnity)
  unity: OaUnity | null = null

  @ResponseSerialize(Plan)
  plan: Plan | null = null

  @ResponseSerialize(User)
  user: User | null = null

  @ResponseSerialize(OaVersion)
  oaVersions: OaVersion[] = []

  @ResponseSerialize(ChartType)
  oaChartTypeAvailability: ChartType[] = []

  @ResponseSerialize(Model)
  oaMatchModel: Model[] = []

  @ResponseSerialize(ObjectOfAnalysis)
  oaMatchOa: ObjectOfAnalysis[] = []

  @ResponseSerialize(ValueType)
  oaValueTypeAvailability: ValueType[] = []

  @ResponseSerialize(OaGroup)
  objectOfAnalysisOaGroup: OaGroup[] = []

  idObjectOfAnalysisPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationMaxLength(511)
  urlThumbnail: string | null = null

  @ValidationMaxLength(255)
  comment: string | null = null

  @ValidationMaxLength(255)
  idFromSource: string | null = null

  lastUpdate: string | null = null

  @ValidationRequired()
  active: boolean = false

  get idUserFk() {
    if (!this.user) return 0
    return this.user.$id
  }
  set idUserFk(idUserFk: ID) {
    if (!this.user) this.user = new User()
    this.user.$id = idUserFk
  }

  // get idCategoryFk() {
  // if (!this.category) return 0
  // return this.category.$id
  // }
  // set idCategoryFk(idCategoryFk: ID) {
  // if (!this.category) this.category = new OaCategory()
  // this.category.$id = idCategoryFk
  // }

  get idPeriodicityFk() {
    if (!this.periodicity) return 0
    return this.periodicity.$id
  }
  set idPeriodicityFk(idPeriodicityFk: ID) {
    if (!this.periodicity) this.periodicity = new OaPeriodicity()
    this.periodicity.$id = idPeriodicityFk
  }

  get idUnityFk() {
    if (!this.unity) return 0
    return this.unity.$id
  }
  set idUnityFk(idUnityFk: ID) {
    if (!this.unity) this.unity = new OaUnity()
    this.unity.$id = idUnityFk
  }

  get idSourceFk() {
    if (!this.source) return 0
    return this.source.$id
  }
  set idSourceFk(idSourceFk: ID) {
    if (!this.source) this.source = new OaSource()
    this.source.$id = idSourceFk
  }

  get idRecommendedChartFk() {
    if (!this.recommendedChart) return 0
    return this.recommendedChart.$id
  }
  set idRecommendedChartFk(idRecommendedChartFk: ID) {
    if (!this.recommendedChart) this.recommendedChart = new ChartType()
    this.recommendedChart.$id = idRecommendedChartFk
  }

  get idPlanFk() {
    if (!this.plan) return 0
    return this.plan.$id
  }
  set idPlanFk(idPlanFk: ID) {
    if (!this.plan) this.plan = new Plan()
    this.plan.$id = idPlanFk
  }

  scheme() {
    return {
      recommendedChart: this.recommendedChart && this.recommendedChart.$id,
      // category: this.category && this.category.$id,
      periodicity: this.periodicity && this.periodicity.$id,
      source: this.source && this.source.$id,
      unity: this.unity && this.unity.$id,
      plan: this.plan && this.plan.$id,
      user: this.user && this.user.$id,
      idObjectOfAnalysisPk: this.idObjectOfAnalysisPk,
      title: this.title,
      comment: this.comment,
      idFromSource: this.idFromSource,
      lastUpdate: datetime(this.lastUpdate),
      active: bool(this.active),
    }
  }

  csvScheme() {
    return {
      recommendedChart: this.recommendedChart && this.recommendedChart.$id,
      // category: this.category && this.category.$id,
      periodicity: this.periodicity && this.periodicity.$id,
      source: this.source && this.source.$id,
      unity: this.unity && this.unity.$id,
      plan: this.plan && this.plan.$id,
      user: this.user && this.user.$id,
      idObjectOfAnalysisPk: this.idObjectOfAnalysisPk,
      title: this.title,
      comment: this.comment,
      idFromSource: this.idFromSource,
      lastUpdate: datetime(this.lastUpdate),
      active: bool(this.active),
    }
  }
}
