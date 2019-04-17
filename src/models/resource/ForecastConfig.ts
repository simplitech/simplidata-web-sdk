import { ForecastType } from './ForecastType'
import moment from 'moment'

export class ForecastConfig {
  start: string | null = null
  end: string | null = null
  forecastType = ForecastType.AUTOMATIC
  stepsAhead = 99999
  numberOfPreForecastObservationsToGraph = 99999
  showFittedValuesForPreForecastRange = true
  confidenceInterval = 0.95
  plotConfidenceIntervalAs: number | null = null // 1 - errorBars, 2 - lowAndHighLines, 3 - shadedArea

  inputFromDt(dt: string | null) {
    return dt ? moment(dt).format('YYYY-MM-DD') : null
  }

  dtFromInput(dt: string | null) {
    if (!dt) {
      return null
    }

    const dtMoment = moment(dt)

    if (dtMoment.year() < 1000) {
      return null
    }

    return dtMoment.format()
  }

  get startInput() {
    return this.inputFromDt(this.start)
  }

  set startInput(val) {
    if (!val) {
      this.start = null
    }

    const dt = this.dtFromInput(val)

    if (dt) {
      this.start = dt
    }
  }

  get endInput() {
    return this.inputFromDt(this.end)
  }

  set endInput(val) {
    if (!val) {
      this.end = null
    }

    const dt = this.dtFromInput(val)

    if (dt) {
      this.end = dt
    }
  }
}
