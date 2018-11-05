import { ObjectOfAnalysis } from './ObjectOfAnalysis'
import { OaVersion } from './OaVersion'
import { ItemRFU } from './ItemRFU'
import { PeriodicityTransformationType } from './PeriodicityTransformationType'

export class ObjectOfAnalysisRFU extends ItemRFU {
  objectOfAnalysis?: ObjectOfAnalysis
  oaVersion?: OaVersion
  periodicityTransformationType?: PeriodicityTransformationType
}
