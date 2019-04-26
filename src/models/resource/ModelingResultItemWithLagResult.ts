import { ResponseSerialize } from '../../simpli'
import { ModelingResultItem } from './ModelingResultItem'

export class ModelingResultItemWithLagResult extends ModelingResultItem {
  @ResponseSerialize(ModelingResultItem)
  lagResult: ModelingResultItem[] = []
}
