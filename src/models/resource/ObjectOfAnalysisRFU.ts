import moment from 'moment'
import { ResponseSerialize } from 'simpli-web-sdk'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaVersion } from './OaVersion'
import { ItemRFU } from './ItemRFU'
import { PeriodicityTransformationType } from './PeriodicityTransformationType'
import { transform } from '../../utils/datasetTransformer.utils'
import { OaPeriodicity } from './OaPeriodicity'

export class ObjectOfAnalysisRFU extends ItemRFU {
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

  get $contentTitle() {
    let title = this.objectOfAnalysis ? this.objectOfAnalysis.title : ''

    return this.orderedTransformations.reduce((title, transf) => {
      return title + ' (' + transf.title + ')'
    }, title)
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

    this.dataListRFU = result
  }
}
