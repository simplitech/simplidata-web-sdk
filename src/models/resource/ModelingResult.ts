import { OaData } from './OaData'
import { ModelingResultRoot } from './ModelingResultRoot'
import { ModelingResultItem } from './ModelingResultItem'
import { Model } from '../../simpli'
import { SimpliData } from '../../simplidata'
import { ModelingRequest } from './ModelingRequest'

export class ModelingResult extends Model {
  // tem em todos modelos:
  meanDependentVar?: number
  standardDeviationDependentVar?: number

  // nos modelos do tipo: var, ar
  durbinWatson?: number

  // nos modelos do tipo: var, ar, mqo
  sumSquaredResid?: number
  rSquared?: number
  adjustedRSquared?: number
  standardErrorOfRegression?: number
  fTest?: number
  pValudOfF?: number

  // nos modelos: arma, armax, arima, mqo
  logLikelihood?: number

  // nos modelos: arma, armax, arima, ar
  akaikiCriterion?: number
  schwarzCriterion?: number
  hannanQuinnCritetion?: number
  arRoots?: ModelingResultRoot[]
  maRoots?: ModelingResultRoot[]

  // nos modelos: mqo
  durbinsH?: number

  forecast?: OaData[] = []
  itemsResults?: ModelingResultItem[]

  async get(modelingRequest: ModelingRequest) {
    await this.POST(`${SimpliData.modelingURL}processModel`, modelingRequest, {}, false)
  }
}
