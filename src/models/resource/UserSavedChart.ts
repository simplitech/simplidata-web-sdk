/**
 * UserSavedChart
 * @author Simpli© CLI generator
 */
import moment from 'moment'
import { ID, Resource } from '../../simpli'
import { $, ResponseSerialize, ValidationMaxLength, ValidationRequired } from '../../simpli'
import { Collection } from './Collection'
import { ChartType } from './ChartType'
import { DownloadType } from './DownloadType'
import { TransformationType } from './TransformationType'
import { User } from './User'
import { ChartGraphic } from './ChartGraphic'
import { LineChartGraphic } from './LineChartGraphic'
import { EllipseChartGraphic } from './EllipseChartGraphic'
import { RectangleChartGraphic } from './RectangleChartGraphic'
import { PencilChartGraphic } from './PencilChartGraphic'
import UserSavedChartSchema from '../../schemas/UserSavedChart.schema'
import { ItemRFU } from './ItemRFU'
import { version } from '../../utils'
import { plainToClass } from 'class-transformer'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'
import { OaData } from './OaData'

export interface MapOfDateAndValues {
  [key: string]: (number | null | undefined)[]
}

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

  // TODO: should this go to json? it was on Chart.ts props
  oaVersionIds?: number[] = []

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
      if (g.$name === 'LineChartGraphic') {
        this.graphics.push(plainToClass<LineChartGraphic, object>(LineChartGraphic, g))
      } else if (g.$name === 'EllipseChartGraphic') {
        this.graphics.push(plainToClass<EllipseChartGraphic, object>(EllipseChartGraphic, g))
      } else if (g.$name === 'RectangleChartGraphic') {
        this.graphics.push(plainToClass<RectangleChartGraphic, object>(RectangleChartGraphic, g))
      } else if (g.$name === 'PencilChartGraphic') {
        this.graphics.push(plainToClass<PencilChartGraphic, object>(PencilChartGraphic, g))
      }
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

  get chartData() {
    if (!this.itensRFU || !this.itensRFU.length) {
      return
    }

    const map: MapOfDateAndValues = {}

    this.itensRFU.forEach((item: ItemRFU, index: number) => {
      if (!this.oaVersionIds) {
        return
      }

      item.dataListRFU.forEach((data: OaData) => {
        const dtFormat: string = $.t('system.format.date').toString()
        const formattedDate = moment(data.dt).format(dtFormat)

        if (!map[formattedDate]) {
          map[formattedDate] = Array(index).fill(null)
        }

        map[formattedDate].push(data.value)
      })
    })

    const result: any[] = []

    for (const i in map) {
      if (i) {
        const spaceLeft = this.itensRFU.length - map[i].length
        const spaceArr = spaceLeft > 0 ? Array(spaceLeft).fill(null) : []
        result.push([i, ...map[i], ...spaceArr])
      }
    }

    return result
  }
}
