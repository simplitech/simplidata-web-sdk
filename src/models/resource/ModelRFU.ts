import { ResponseSerialize } from 'simpli-web-sdk'
import { Model } from './Model'
import { ItemRFU } from './ItemRFU'
import { ModellingResult } from './ModellingResult'

export class ModelRFU extends ItemRFU {
  @ResponseSerialize(Model)
  model?: Model

  @ResponseSerialize(ItemRFU)
  itemsRFU?: ItemRFU[]

  @ResponseSerialize(ModellingResult)
  modelResult?: ModellingResult

  forecastColorIndex?: number

  constructor(model: Model | null, itemsRFU: ItemRFU[]) {
    super()
    if (model) {
      this.model = model
    }
    this.itemsRFU = itemsRFU
  }
}
