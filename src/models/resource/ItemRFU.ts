import { ResponseSerialize } from '../../simpli'
import { TransformationType } from './TransformationType'
import { OaData } from './OaData'
import { BasicLag } from './BasicLag'

export class ItemRFU {
  readonly $name: string = 'ItemRFU'

  @ResponseSerialize(TransformationType)
  orderedTransformations: TransformationType[] = []

  @ResponseSerialize(BasicLag)
  basicLag: BasicLag | null = new BasicLag()

  listLag: number[] = []

  @ResponseSerialize(OaData)
  dataListRFU: OaData[] = [] // watch para atualizar conforme objectOfAnalysis, oaVersion, orderedTransformations, lag e periodicityTransformationType

  get contentTitle() {
    return ''
  }

  get unityTitle() {
    return ''
  }
}
