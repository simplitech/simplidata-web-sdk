export class ForecastConfig {
  start: string | null = null
  end: string | null = null
  forecastType: number | null = null // 1 - automatic, 2 - dynamic, 3 - static, 4 - recursive (apenas arima)
  stepsAhead: number | null = null
  numberOfPreForecastObservationsToGraph: number | null = null
  showFittedValuesForPreForecastRange: boolean | null = null
  confidenceInterval: number | null = null
  plotConfidenceIntervalAs: number | null = null // 1 - errorBars, 2 - lowAndHighLines, 3 - shadedArea
}
