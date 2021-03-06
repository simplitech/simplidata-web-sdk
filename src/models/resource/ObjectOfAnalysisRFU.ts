import moment from 'moment'
import { ResponseSerialize } from '../../simpli'
import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaVersion } from './OaVersion'
import { ItemRFU } from './ItemRFU'
import { PeriodicityTransformationType } from './PeriodicityTransformationType'
import { transform } from '../../utils/datasetTransformer.utils'
import { periodicityTransform } from '../../utils/periodicityTransformer.utils'
import { OaPeriodicity } from './OaPeriodicity'

export class ObjectOfAnalysisRFU extends ItemRFU {
  readonly $name: string = 'ObjectOfAnalysisRFU'

  @ResponseSerialize(ObjectOfAnalysis)
  objectOfAnalysis?: ObjectOfAnalysis

  @ResponseSerialize(OaVersion)
  oaVersion?: OaVersion

  @ResponseSerialize(PeriodicityTransformationType)
  periodicityTransformationType: PeriodicityTransformationType | null = null

  constructor(oa?: ObjectOfAnalysis, version?: OaVersion) {
    super()

    if (oa) {
      this.objectOfAnalysis = oa
    }

    if (version) {
      this.oaVersion = version
    }
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

  refreshDataListRFU(start: string | null, end: string | null, periodicity: OaPeriodicity | null) {
    if (
      !this.oaVersion ||
      !this.oaVersion.lastDataset ||
      this.objectOfAnalysis === undefined ||
      this.objectOfAnalysis.periodicity === null
    ) {
      return
    }

    let result = this.oaVersion.lastDataset.oaDataList

    const needsPeriodicityTransformation: boolean =
      periodicity !== null &&
      this.periodicityTransformationType !== null &&
      this.objectOfAnalysis.periodicity.idOaPeriodicityPk !== periodicity.idOaPeriodicityPk
    const needsDatasetTransformation: boolean = this.orderedTransformations.length > 0

    if ((needsPeriodicityTransformation || needsDatasetTransformation) && (start || end)) {
      result = result.filter(oadata => {
        return (!start || moment(oadata.dt).isSameOrAfter(start)) && (!end || moment(oadata.dt).isSameOrBefore(end))
      })
    }

    this.orderedTransformations.forEach(t => {
      result = transform(result, t)
    })

    if (needsPeriodicityTransformation && this.periodicityTransformationType && periodicity) {
      result = periodicityTransform(result, this.periodicityTransformationType, periodicity)
    }

    const per = periodicity || this.objectOfAnalysis.periodicity

    this.setDataListRFU(result, per.asFrequency)
  }
}
