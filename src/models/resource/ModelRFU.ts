import { ResponseSerialize } from 'simpli-web-sdk'
import { Model } from './Model'
import { ItemRFU } from './ItemRFU'
import { ModelingResult } from './ModelingResult'
import { Exclude } from 'class-transformer'

export class ModelRFU extends ItemRFU {
  readonly $name: string = 'ModelRFU'

  @ResponseSerialize(Model)
  model: Model | null = null

  @ResponseSerialize(ItemRFU)
  itemsRFU!: ItemRFU[]

  @Exclude({ toPlainOnly: true })
  @ResponseSerialize(ModelingResult)
  modelResult?: ModelingResult

  forecastColorIndex?: number

  constructor(model: Model | null, itemsRFU: ItemRFU[] = []) {
    super()
    if (model) {
      this.model = model
    }
    this.itemsRFU = itemsRFU
  }

  get contentTitle() {
    return this.model ? this.model.title : ''
  }

  cloneForModeling(): ModelRFU {
    const cleanIrfu = this.clone()
    cleanIrfu.itemsRFU = cleanIrfu.itemsRFU.map(irfu => irfu.getRequestContent(cleanIrfu.itemsRFU))
    return cleanIrfu
  }

  hasDeeplyIncluded(other: ItemRFU): boolean {
    return this.itemsRFU.some(thisIrfu => {
      return thisIrfu === other || (thisIrfu.$name === 'ModelRFU' && (thisIrfu as ModelRFU).hasDeeplyIncluded(other))
    })
  }
}
