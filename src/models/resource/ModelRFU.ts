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

  private pModelResult: ModelingResult | null = null

  @Exclude({ toPlainOnly: true })
  @ResponseSerialize(ModelingResult)
  get modelResult(): ModelingResult | null {
    return this.pModelResult
  }

  set modelResult(val: ModelingResult | null) {
    this.pModelResult = val
    if (val && this.frequency) {
      this.setDataListRFU(val.forecast, this.frequency)
    }
  }

  constructor(model: Model | null, itemsRFU: ItemRFU[] = []) {
    super()
    if (model) {
      this.model = model
    }
    this.itemsRFU = itemsRFU

    const irfuWFrequency = this.itemsRFU.find(i => i.frequency !== null)
    if (irfuWFrequency) {
      this.frequency = irfuWFrequency.frequency
    }
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
