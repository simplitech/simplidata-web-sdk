import { ResponseSerialize } from '../../simpli'
import { ModelingResultItem } from './ModelingResultItem'
import { ModelingResultLag } from './ModelingResultLag'

export class ModelingResultVariable extends ModelingResultItem {
  @ResponseSerialize(ModelingResultLag)
  lagResult: ModelingResultLag[] = []
}
