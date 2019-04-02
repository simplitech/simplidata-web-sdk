import { OaData } from './OaData'
import { ModelingResultRoot } from './ModelingResultRoot'
import { ModelingResultItem } from './ModelingResultItem'
import { Model, ResponseSerialize } from '../../simpli'
import { SimpliData } from '../../simplidata'
import { ModelingRequest } from './ModelingRequest'

export class ModelingResult extends Model {
  // tem em todos modelos:
  @ResponseSerialize(Number)
  meanDependentVar: number | null = null
  @ResponseSerialize(Number)
  standardDeviationDependentVar: number | null = null

  // nos modelos do tipo: var, ar
  @ResponseSerialize(Number)
  durbinWatson: number | null = null

  // nos modelos do tipo: var, ar, mqo
  @ResponseSerialize(Number)
  sumSquaredResid: number | null = null
  @ResponseSerialize(Number)
  rSquared: number | null = null
  @ResponseSerialize(Number)
  adjustedRSquared: number | null = null
  @ResponseSerialize(Number)
  standardErrorOfRegression: number | null = null
  @ResponseSerialize(Number)
  fTest: number | null = null
  @ResponseSerialize(Number)
  pValudOfF: number | null = null

  // nos modelos: arma, armax, arima, mqo
  @ResponseSerialize(Number)
  logLikelihood: number | null = null

  // nos modelos: arma, armax, arima, ar
  @ResponseSerialize(Number)
  akaikiCriterion: number | null = null
  @ResponseSerialize(Number)
  schwarzCriterion: number | null = null
  @ResponseSerialize(Number)
  hannanQuinnCritetion: number | null = null
  @ResponseSerialize(ModelingResultRoot)
  arRoots: ModelingResultRoot[] = []
  @ResponseSerialize(ModelingResultRoot)
  maRoots: ModelingResultRoot[] = []

  // nos modelos: mqo
  @ResponseSerialize(Number)
  durbinsH: number | null = null

  @ResponseSerialize(OaData)
  forecast: OaData[] = []
  @ResponseSerialize(ModelingResultItem)
  itemsResults: ModelingResultItem[] = []

  async get(modelingRequest: ModelingRequest) {
    await this.POST(`${SimpliData.modelingURL}processModel`, modelingRequest, {}, false)
  }
}
