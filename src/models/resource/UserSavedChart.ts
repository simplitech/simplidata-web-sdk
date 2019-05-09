/**
 * UserSavedChart
 * @author Simpli CLI generator
 */
import moment from 'moment'
import { ID, Resource } from '../../simpli'
import { $, ResponseSerialize, ValidationMaxLength, ValidationRequired, RequestExclude } from '../../simpli'
import { Collection } from './Collection'
import { ChartType } from './ChartType'
import { DownloadType } from './DownloadType'
import { User } from './User'
import { ChartGraphic } from './ChartGraphic/ChartGraphic'
import { LineChartGraphic } from './ChartGraphic/LineChartGraphic'
import { TextChartGraphic } from './ChartGraphic/TextChartGraphic'
import { EllipseChartGraphic } from './ChartGraphic/EllipseChartGraphic'
import { RectangleChartGraphic } from './ChartGraphic/RectangleChartGraphic'
import { PencilChartGraphic } from './ChartGraphic/PencilChartGraphic'
import { CommentChartGraphic } from './ChartGraphic/CommentChartGraphic'
import { MeasureChartGraphic } from './ChartGraphic/MeasureChartGraphic'
import { FibonacciRetractionChartGraphic } from './ChartGraphic/FibonacciRetractionChartGraphic'
import UserSavedChartSchema from '../../schemas/UserSavedChart.schema'
import { ItemRFU } from './ItemRFU'
import { version } from '../../utils'
import { plainToClass } from 'class-transformer'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'
import { OaData } from './OaData'

export interface MapOfDateAndValues {
  [key: string]: (number | null | undefined)[]
}

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

  oaVersionIds?: number[] = []

  @ValidationRequired()
  @ValidationMaxLength(255)
  json: string = ''

  @RequestExclude() // only to check if needs saving
  lastSavedJson = ''

  @RequestExclude() // json property
  graphics: ChartGraphic[] = []

  @RequestExclude() // json property
  chartType = new ChartType()

  @RequestExclude() // json property
  startDtLimiter: string | null = null

  @RequestExclude() // json property
  endDtLimiter: string | null = null

  @RequestExclude() // json property
  itensRFU: ItemRFU[] = []

  buildJson() {
    this.json = this.unsavedJson
  }

  get unsavedJson() {
    return JSON.stringify({
      version,
      graphics: this.graphics,
      chartType: this.chartType,
      startDtLimiter: this.startDtLimiter,
      endDtLimiter: this.endDtLimiter,
      itensRFU: this.itensRFUForJson,
    })
  }

  get relevantToSave() {
    return JSON.stringify({
      graphics: this.graphics,
      startDtLimiter: this.startDtLimiter,
      endDtLimiter: this.endDtLimiter,
    })
  }

  async parseJson() {
    const jsonParsed = JSON.parse(this.json)
    this.chartType = plainToClass<ChartType, object>(ChartType, jsonParsed.chartType)
    this.startDtLimiter = jsonParsed.startDtLimiter
    this.endDtLimiter = jsonParsed.endDtLimiter
    this.itensRFU = []
    this.graphics = []

    await this.parseItensRFU(jsonParsed.itensRFU)

    jsonParsed.graphics.forEach((g: any) => {
      if (g.name === 'LineChartGraphic') {
        this.graphics.push(plainToClass<LineChartGraphic, object>(LineChartGraphic, g))
      } else if (g.name === 'EllipseChartGraphic') {
        this.graphics.push(plainToClass<EllipseChartGraphic, object>(EllipseChartGraphic, g))
      } else if (g.name === 'RectangleChartGraphic') {
        this.graphics.push(plainToClass<RectangleChartGraphic, object>(RectangleChartGraphic, g))
      } else if (g.name === 'PencilChartGraphic') {
        this.graphics.push(plainToClass<PencilChartGraphic, object>(PencilChartGraphic, g))
      } else if (g.name === 'TextChartGraphic') {
        this.graphics.push(plainToClass<TextChartGraphic, object>(TextChartGraphic, g))
      } else if (g.name === 'CommentChartGraphic') {
        this.graphics.push(plainToClass<CommentChartGraphic, object>(CommentChartGraphic, g))
      } else if (g.name === 'MeasureChartGraphic') {
        this.graphics.push(plainToClass<MeasureChartGraphic, object>(MeasureChartGraphic, g))
      } else if (g.name === 'FibonacciRetractionChartGraphic') {
        this.graphics.push(plainToClass<FibonacciRetractionChartGraphic, object>(FibonacciRetractionChartGraphic, g))
      }
    })
  }

  get itensRFUForJson() {
    return this.itensRFU.map(irfu => {
      if (irfu.$name === 'ObjectOfAnalysisRFU') {
        const oarfu = irfu as ObjectOfAnalysisRFU
        const { objectOfAnalysis, values, firstDate, frequency, oaVersion, ...oarfuWithoutOa } = oarfu
        const oarfuClean: any = oarfuWithoutOa

        if (objectOfAnalysis !== undefined) {
          oarfuClean.objectOfAnalysis = { idObjectOfAnalysisPk: objectOfAnalysis.idObjectOfAnalysisPk }
        }

        if (oaVersion !== undefined) {
          oarfuClean.oaVersion = { idOaVersionPk: oaVersion.idOaVersionPk }
        }

        return oarfuClean
      } else {
        // TODO: fazer pra model tb
        console.log('ARRUMAR AQUI')
      }

      return irfu
    })
  }

  async parseItensRFU(irfus: any[]) {
    for (const irfu of irfus) {
      let realIrfu: ItemRFU
      if (irfu.$name === 'ObjectOfAnalysisRFU') {
        const oarfu: ObjectOfAnalysisRFU = plainToClass<ObjectOfAnalysisRFU, object>(ObjectOfAnalysisRFU, irfu)
        if (oarfu.objectOfAnalysis) {
          await oarfu.objectOfAnalysis.find(oarfu.objectOfAnalysis.idObjectOfAnalysisPk)
        }
        realIrfu = oarfu
      } else {
        // TODO: fazer pra model tb
        console.log('ARRUMAR AQUI')
        realIrfu = plainToClass<ItemRFU, object>(ItemRFU, irfu)
      }

      this.itensRFU.push(realIrfu)
    }
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

  get idChartTypeFk() {
    if (!this.chartType) return 0
    return this.chartType.$id
  }
  set idChartTypeFk(idChartTypeFk: ID) {
    if (!this.chartType) this.chartType = new ChartType()
    this.chartType.$id = idChartTypeFk
  }

  get chartData() {
    if (!this.itensRFU || !this.itensRFU.length) {
      return
    }

    const map: MapOfDateAndValues = {}
    const dtFormat: string = $.t('system.format.date').toString()

    this.itensRFU.forEach((item: ItemRFU, index: number) => {
      if (!this.oaVersionIds) {
        return
      }

      item.dataListRFU.forEach((data: OaData) => {
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

    const sorted = result.sort((a, b) => {
      return moment(a[0], dtFormat).diff(moment(b[0], dtFormat))
    })

    return sorted
  }
}
