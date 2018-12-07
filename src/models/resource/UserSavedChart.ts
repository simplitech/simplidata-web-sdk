/**
 * UserSavedChart
 * @author Simpli© CLI generator
 */
import { ID, Resource } from '../../simpli'
import { ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { Collection } from './Collection'
import { ChartType } from './ChartType'
import { DownloadType } from './DownloadType'
import { TransformationType } from './TransformationType'
import { User } from './User'
import { ChartGraphic } from './ChartGraphic'
import UserSavedChartSchema from '../../schemas/UserSavedChart.schema'
import { ItemRFU } from './ItemRFU'
import { version } from '../../utils'
import { plainToClass } from 'class-transformer'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'

/* TODO: review generated class */
export class UserSavedChart extends Resource {
  readonly $name: string = 'UserSavedChart'
  readonly $endpoint: string = '/User/UserSavedChart{/id}'

  get $schema() {
    return UserSavedChartSchema(this)
  }

  get $id() {
    return this.idUserChartPk
  }
  set $id(val: ID) {
    this.idUserChartPk = val
  }

  @ResponseSerialize(Collection)
  collection: Collection | null = null

  @ResponseSerialize(DownloadType)
  downloadType: DownloadType | null = null

  @ResponseSerialize(User)
  user: User | null = null

  idUserChartPk: ID = 0

  @ValidationRequired()
  creationDate: string | null = null

  @ValidationRequired()
  active: boolean = false

  @ValidationRequired()
  @ValidationMaxLength(255)
  json: string = ''

  // json properties
  graphics: ChartGraphic[] = []
  chartType = new ChartType()
  startDtLimiter: string | null = null
  endDtLimiter: string | null = null
  itensRFU: ItemRFU[] = []

  buildJson() {
    this.json = JSON.stringify({
      version,
      graphics: this.graphics,
      chartType: this.chartType,
      startDtLimiter: this.startDtLimiter,
      endDtLimiter: this.endDtLimiter,
      itensRFU: this.itensRFU,
    })
  }

  parseJson() {
    const jsonParsed = JSON.parse(this.json)
    this.chartType = plainToClass<ChartType, object>(ChartType, jsonParsed.chartType)
    this.startDtLimiter = jsonParsed.startDtLimiter
    this.endDtLimiter = jsonParsed.endDtLimiter
    this.itensRFU = []
    this.graphics = []

    jsonParsed.itensRFU.forEach((irfu: any) => {
      if (irfu.$name === 'ObjectOfAnalysisRFU') {
        this.itensRFU.push(plainToClass<ObjectOfAnalysisRFU, object>(ObjectOfAnalysisRFU, irfu))
      } else {
        this.itensRFU.push(plainToClass<ItemRFU, object>(ItemRFU, irfu))
      }
    })

    jsonParsed.graphics.forEach((g: any) => {
      this.graphics.push(plainToClass<ChartGraphic, object>(ChartGraphic, g))
    })
  }

  get idUserFk() {
    if (!this.user) return 0
    return this.user.$id
  }
  set idUserFk(idUserFk: ID) {
    if (!this.user) this.user = new User()
    this.user.$id = idUserFk
  }

  get idCollectionFk() {
    if (!this.collection) return 0
    return this.collection.$id
  }
  set idCollectionFk(idCollectionFk: ID) {
    if (!this.collection) this.collection = new Collection()
    this.collection.$id = idCollectionFk
  }

  get idDownloadTypeFk() {
    if (!this.downloadType) return 0
    return this.downloadType.$id
  }
  set idDownloadTypeFk(idDownloadTypeFk: ID) {
    if (!this.downloadType) this.downloadType = new DownloadType()
    this.downloadType.$id = idDownloadTypeFk
  }
}
