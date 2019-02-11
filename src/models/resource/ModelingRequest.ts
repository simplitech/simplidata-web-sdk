import { ModelRFU } from './ModelRFU'
import { ForecastConfig } from './ForecastConfig'
import { Model } from '../../simpli'

export class ModelingRequest extends Model {
  modelRFU?: ModelRFU
  forecastConfig?: ForecastConfig
}
