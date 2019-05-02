import { OaData } from './OaData'
import { ModelingResultRoot } from './ModelingResultRoot'
import { Model, ResponseSerialize } from '../../simpli'
import { SimpliData } from '../../simplidata'
import { ModelingRequest } from './ModelingRequest'
import { ModelingResultVariable } from './ModelingResultVariable'

export class ModelingResult extends Model {
  // tem em todos modelos:
  @ResponseSerialize(Number)
  meanDependentVar: number | null = null // Média var. dependente
  @ResponseSerialize(Number)
  standardDeviationDependentVar: number | null = null // D. P. var. dependente

  // nos modelos do tipo: var, ar
  @ResponseSerialize(Number)
  durbinWatson: number | null = null // Durbin Watson

  // nos modelos do tipo: var, ar, mqo
  @ResponseSerialize(Number)
  sumSquaredResid: number | null = null // Soma resíd. quadrados
  @ResponseSerialize(Number)
  rSquared: number | null = null // R-quad. não-concentrado
  @ResponseSerialize(Number)
  adjustedRSquared: number | null = null // R-quad. centrado
  @ResponseSerialize(Number)
  standardErrorOfRegression: number | null = null // E. P. da regressão
  @ResponseSerialize(Number)
  fTest: number | null = null // F(x, y)
  @ResponseSerialize(Number)
  fTestCoordinates: number[] = [] // x and y of F(x, y)
  @ResponseSerialize(Number)
  pValudOfF: number | null = null // P-valor(F)

  // nos modelos: arma, armax, arima, mqo
  @ResponseSerialize(Number)
  logLikelihood: number | null = null // Log da verossimilhança

  // nos modelos: arma, armax, arima, ar
  @ResponseSerialize(Number)
  akaikiCriterion: number | null = null // Critério de Akaike
  @ResponseSerialize(Number)
  schwarzCriterion: number | null = null // Critério de Schwarz
  @ResponseSerialize(Number)
  hannanQuinnCritetion: number | null = null // Critério de Hannan-Quinn
  @ResponseSerialize(ModelingResultRoot)
  arRoots: ModelingResultRoot[] = [] // Raiz AR
  @ResponseSerialize(ModelingResultRoot)
  maRoots: ModelingResultRoot[] = [] // Raiz MA

  // nos modelos: mqo
  @ResponseSerialize(Number)
  durbinsH: number | null = null // TODO: descobrir esse nome

  @ResponseSerialize(OaData)
  forecast: OaData[] = [] // Projeção
  @ResponseSerialize(ModelingResultVariable)
  itemsResults: ModelingResultVariable[] = []

  async get(modelingRequest: ModelingRequest) {
    await this.POST(`${SimpliData.modelingURL}processModel`, modelingRequest, {}, false)
  }
}
