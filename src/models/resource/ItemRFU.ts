import { ResponseSerialize, Model } from '../../simpli'
import { TransformationType } from './TransformationType'
import { OaData } from './OaData'
import { BasicLag } from './BasicLag'

export class ItemRFU extends Model {
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

  get contentTitleWithTransformation() {
    let title = this.contentTitle

    return this.orderedTransformations.reduce((title, transf) => {
      return title + ' (' + transf.tagWithCombiner + ')'
    }, title)
  }

  get unityTitle() {
    return ''
  }

  getRequestContent() {
    const cleanIrfu = new ItemRFU()
    cleanIrfu.basicLag = this.basicLag
    cleanIrfu.listLag = this.listLag
    cleanIrfu.dataListRFU = this.dataListRFU
    return cleanIrfu
  }
}
