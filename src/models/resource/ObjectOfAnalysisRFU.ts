import moment from 'moment'
import { ResponseSerialize } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaVersion } from './OaVersion'
import { ItemRFU } from './ItemRFU'
import { PeriodicityTransformationType } from './PeriodicityTransformationType'
import { transform } from '../../utils/datasetTransformer.utils'
import { OaPeriodicity } from './OaPeriodicity'

export class ObjectOfAnalysisRFU extends ItemRFU {
  private static dataListRFULimit = 18 // TODO: change this limit to something higher

  readonly $name: string = 'ObjectOfAnalysisRFU'

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysis?: ObjectOfAnalysis

  @ResponseSerialize(OaVersion)
  oaVersion?: OaVersion

  @ResponseSerialize(PeriodicityTransformationType)
  periodicityTransformationType?: PeriodicityTransformationType

  constructor(oa?: ObjectOfAnalysis, version?: OaVersion, start?: string | null, end?: string | null) {
    super()
    this.objectOfAnalysis = oa
    this.oaVersion = version
    this.refreshDataListRFU(start, end)
  }

  get contentTitle() {
    return this.objectOfAnalysis ? this.objectOfAnalysis.title : ''
  }

  get unityTitle() {
    if (!this.objectOfAnalysis || !this.objectOfAnalysis.unity) {
      return ''
    }
    return this.objectOfAnalysis.unity.title
  }

  refreshDataListRFU(start?: string | null, end?: string | null, periodicity?: OaPeriodicity | null) {
    if (!this.oaVersion || !this.oaVersion.lastDataset) {
      return
    }

    let result = this.oaVersion.lastDataset.oaDataList

    if (this.orderedTransformations.length && (start || end)) {
      result = result.filter(oadata => {
        return (!start || moment(oadata.dt).isSameOrAfter(start)) && (!end || moment(oadata.dt).isSameOrBefore(end))
      })
    }

    this.orderedTransformations.forEach(t => {
      result = transform(result, t)
    })

    // TODO: transformar usando lag

    // TODO: transformar usando periodicityTransformationType e periodicity

    this.dataListRFU = result.slice(0, ObjectOfAnalysisRFU.dataListRFULimit)
  }
}
