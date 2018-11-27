import moment from 'moment'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaVersion } from './OaVersion'
import { ItemRFU } from './ItemRFU'
import { PeriodicityTransformationType } from './PeriodicityTransformationType'
import { transform } from '../../utils/datasetTransformer.utils'

export class ObjectOfAnalysisRFU extends ItemRFU {
  readonly $name: string = 'ObjectOfAnalysisRFU'
  objectOfAnalysis?: ObjectOfAnalysis
  oaVersion?: OaVersion
  periodicityTransformationType?: PeriodicityTransformationType

  constructor(oa?: ObjectOfAnalysis, version?: OaVersion, start?: string | null, end?: string | null) {
    super()
    this.objectOfAnalysis = oa
    this.oaVersion = version
    this.refreshDataListRFU(start, end)
  }

  refreshDataListRFU(start?: string | null, end?: string | null) {
    if (!this.oaVersion || !this.oaVersion.lastDataset) {
      return
    }
    // atualizar conforme objectOfAnalysis, oaVersion, orderedTransformations, lag e periodicityTransformationType
    let result = this.oaVersion.lastDataset.oaDataList

    if (this.orderedTransformations.length && (start || end)) {
      result = result.filter(oadata => {
        return (!start || moment(oadata.dt).isSameOrAfter(start)) && (!end || moment(oadata.dt).isSameOrBefore(end))
      })
    }

    this.orderedTransformations.forEach(t => {
      result = transform(result, t)
    })

    this.dataListRFU = result
  }
}
