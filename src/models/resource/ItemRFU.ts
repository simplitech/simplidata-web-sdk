import { TransformationType } from './TransformationType'
import { OaData } from './OaData'
import { BasicLag } from './BasicLag'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'

export class ItemRFU {
  readonly $name: string = 'ItemRFU'
  orderedTransformations: TransformationType[] = []
  lag?: BasicLag | number[] = []
  dataListRFU: OaData[] = [] // watch para atualizar conforme objectOfAnalysis, oaVersion, orderedTransformations, lag e periodicityTransformationType

  constructor() {
    /**/
  }
}
