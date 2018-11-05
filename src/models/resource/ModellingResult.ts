import { OaDataset } from './OaDataset'
import { ModellingResultRoot } from './ModellingResultRoot'
import { ModellingResultItem } from './ModellingResultItem'

export class ModellingResult {
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
  rho?: number
  fTest?: number
  pValudOfF?: number

  // nos modelos: arma, armax, arima
  meanOfInnovations?: number
  standardDeviationOfInnovations?: number

  // nos modelos: arma, armax, arima, mqo
  logLikelihood?: number

  // nos modelos: arma, armax, arima, ar
  akaikiCriterion?: number
  schwarzCriterion?: number
  hannanQuinnCritetion?: number
  arRoots?: ModellingResultRoot[]
  maRoots?: ModellingResultRoot[]

  // nos modelos: mqo
  durbinsH?: number

  forecast?: OaDataset
  itemsResults?: ModellingResultItem[]
}
