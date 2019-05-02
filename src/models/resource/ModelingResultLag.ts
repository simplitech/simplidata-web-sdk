import { ResponseSerialize } from '../../simpli'
import { ModelingResultItem } from './ModelingResultItem'

export class ModelingResultLag extends ModelingResultItem {
  @ResponseSerialize(Number)
  lagIndex?: number
}
