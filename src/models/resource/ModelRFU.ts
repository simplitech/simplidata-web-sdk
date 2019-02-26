import { ResponseSerialize } from 'simpli-web-sdk'
import { Model } from './Model'
import { ItemRFU } from './ItemRFU'
import { ModelingResult } from './ModelingResult'

export class ModelRFU extends ItemRFU {
  @ResponseSerialize(Model)
  model: Model | null = null

  @ResponseSerialize(ItemRFU)
  itemsRFU: ItemRFU[]

  @ResponseSerialize(ModelingResult)
  modelResult?: ModelingResult

  forecastColorIndex?: number

  constructor(model: Model | null, itemsRFU: ItemRFU[]) {
    super()
    if (model) {
      this.model = model
    }
    this.itemsRFU = itemsRFU
  }

  get contentTitle() {
    return this.model ? this.model.title : ''
  }
}
