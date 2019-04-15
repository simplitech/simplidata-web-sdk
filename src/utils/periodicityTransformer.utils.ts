import moment from 'moment'
import { OaData } from '../models/resource/OaData'
import { OaPeriodicity, PeriodicityTransformationType } from '../models'

interface MapOfStringAndNumber {
  [key: string]: number
}

export function periodicityTransform(
  dataList: OaData[],
  periodicityTransformationType: PeriodicityTransformationType,
  oaPeriodicity: OaPeriodicity
) {
  switch (periodicityTransformationType.$id) {
    case PeriodicityTransformationType.AVG:
      return avg(dataList, oaPeriodicity)
    case PeriodicityTransformationType.SUM:
      return sum(dataList, oaPeriodicity)
    case PeriodicityTransformationType.END_OF_PERIOD:
      return endOfPeriod(dataList, oaPeriodicity)
  }

  return dataList
}

export function sum(dataList: OaData[], oaPeriodicity: OaPeriodicity): OaData[] {
  return dataList.reduce<OaData[]>((result, oadata) => {
    const periodDate = oaPeriodicity.getPeriodDate(oadata)
    const found = result.find(i => i.dt === periodDate)
    if (found) {
      // sum
      result.push(new OaData(periodDate, (found.value || 0) + (oadata.value || 0)))
    } else {
      result.push(oadata)
    }
    return result
  }, [])
}

export function avg(dataList: OaData[], oaPeriodicity: OaPeriodicity) {
  const periodCount: MapOfStringAndNumber = {}

  // sum and count
  const result = dataList.reduce<OaData[]>((result, oadata) => {
    const periodDate = oaPeriodicity.getPeriodDate(oadata)
    const found = result.find(i => i.dt === periodDate)
    if (found) {
      // sum
      result.push(new OaData(periodDate, (found.value || 0) + (oadata.value || 0)))
    } else {
      result.push(oadata)
    }
    periodCount[periodDate] = (periodCount[periodDate] || 0) + 1
    return result
  }, [])

  // divides the sum by the counted value
  result.forEach(oadata => {
    oadata.value = (oadata.value || 0) / (periodCount[oadata.dt] || 1)
  })

  return result
}

export function endOfPeriod(dataList: OaData[], oaPeriodicity: OaPeriodicity) {
  return dataList.reduce<OaData[]>((result, oadata) => {
    const periodDate = oaPeriodicity.getPeriodDate(oadata)
    const found = result.find(i => i.dt === periodDate)
    if (found) {
      // the end of period is the new value because they are ordered by dt
      result.push(new OaData(periodDate, oadata.value))
    } else {
      result.push(oadata)
    }
    return result
  }, [])
}
