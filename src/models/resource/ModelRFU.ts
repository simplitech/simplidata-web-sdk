import { Model } from './Model'
import { ItemRFU } from './ItemRFU'
import { ModellingResult } from './ModellingResult'

export class ModelRFU extends ItemRFU {
  model?: Model
  itemsRFU?: ItemRFU[]
  modelResult?: ModellingResult
  forecastColorIndex?: number
}
