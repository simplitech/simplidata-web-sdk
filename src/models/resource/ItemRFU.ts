import { ResponseSerialize, Model } from '../../simpli'
import { TransformationType } from './TransformationType'
import { OaData } from './OaData'
import { Exclude } from 'class-transformer'

export class ItemRFU extends Model {
  readonly $name: string = 'ItemRFU'

  @ResponseSerialize(TransformationType)
  orderedTransformations: TransformationType[] = []

  lag: number[] = []

  values: (number | null)[] = []
  firstDate: string | null = null
  frequency: number | null = null // number of observations per year

  @Exclude({ toPlainOnly: true })
  private pDataListRFU: OaData[] = []

  public get dataListRFU() {
    return this.pDataListRFU
  }

  setDataListRFU(oaDataArr: OaData[], frequency: number) {
    this.pDataListRFU = oaDataArr
    this.firstDate = oaDataArr.length ? oaDataArr[0].dt : null
    this.values = oaDataArr.map(oa => oa.value)
    this.frequency = frequency
  }

  get hasConsecutiveLag(): boolean {
    return this.lag.every((v, i) => v === this.lag[i - 1] + 1)
  }

  get contentTitle() {
    return ''
  }

  get contentTitleWithTransformation() {
    let title = this.contentTitle

    return this.orderedTransformations.reduce((title, transf) => {
      return title + (transf.combiner ? '' : ' (' + transf.$tag + ')')
    }, title)
  }

  get hasCombiner() {
    return this.orderedTransformations.some(transf => transf.combiner)
  }

  get orderedCombiners() {
    return this.orderedTransformations.filter(transf => transf.combiner)
  }

  get allItemsOfCombination() {
    return [this, ...this.orderedCombiners.map(transf => transf.combineWith)]
  }

  get unityTitle() {
    return ''
  }

  get initialIntervalLag() {
    return this.lag[0] || 0
  }

  set initialIntervalLag(value) {
    if (this.lag.length < 2) {
      this.lag = [value]
    } else {
      this.setInitialAndFinalLag(value, this.finalIntervalLag)
    }
  }

  get finalIntervalLag() {
    return this.lag[this.lag.length - 1] || 0
  }

  set finalIntervalLag(value) {
    this.setInitialAndFinalLag(this.initialIntervalLag, value)
  }

  setInitialAndFinalLag(initial: number, final: number) {
    this.lag = []
    for (let i = initial; i <= final; i++) {
      this.lag.push(i)
    }
  }

  reloadInitialAndFinalLag() {
    this.setInitialAndFinalLag(this.initialIntervalLag, this.finalIntervalLag)
  }

  getRequestContent(others: ItemRFU[]) {
    const cleanIrfu = new ItemRFU()
    cleanIrfu.lag = this.lag

    if (this.frequency !== null) {
      const tempDataListRFU = this.dataListRFU.filter(oadata =>
        others.every(ot => ot.dataListRFU.some(otoadata => otoadata.dt === oadata.dt))
      )

      cleanIrfu.setDataListRFU(tempDataListRFU, this.frequency)
    }

    return cleanIrfu
  }
}
