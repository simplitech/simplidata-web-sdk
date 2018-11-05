import { TransformationType } from './TransformationType'
import { OaDataset } from './OaDataset'
import { BasicLag } from './BasicLag'

export class ItemRFU {
  orderedTransformations?: TransformationType[]
  lag?: BasicLag | number[]
  datasetRFU?: OaDataset // watch para atualizar conforme objectOfAnalysis, oaVersion, orderedTransformations, lag e periodicityTransformationType
}
