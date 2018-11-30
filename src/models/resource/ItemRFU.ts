import { ResponseSerialize } from 'simpli-web-sdk'
import { TransformationType } from './TransformationType'
import { OaData } from './OaData'
import { BasicLag } from './BasicLag'
import { ObjectOfAnalysisRFU } from './ObjectOfAnalysisRFU'

export class ItemRFU {
  readonly $name: string = 'ItemRFU'

  @ResponseSerialize(TransformationType)
  orderedTransformations: TransformationType[] = []

  @ResponseSerialize(BasicLag)
  basicLag: BasicLag | null = null

  listLag: number[] = []

  @ResponseSerialize(OaData)
  dataListRFU: OaData[] = [] // watch para atualizar conforme objectOfAnalysis, oaVersion, orderedTransformations, lag e periodicityTransformationType

  get $contentTitle() {
    return ''
  }
}
