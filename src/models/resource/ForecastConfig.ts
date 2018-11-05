export class ForecastConfig {
  start?: string
  end?: string
  forecastType?: number // 1 - automatic, 2 - dynamic, 3 - static, 4 - recursive (apenas arima)
  stepsAhead?: number
  numberOfPreForecastObservationsToGraph?: number
  showFittedValuesForPreForecastRange?: boolean
  confidenceInterval?: number
  plotConfidenceIntervalAs?: number // 1 - errorBars, 2 - lowAndHighLines, 3 - shadedArea
}
