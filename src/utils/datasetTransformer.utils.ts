import moment from 'moment'
import { TransformationType } from '../models/resource/TransformationType'
import { OaData } from '../models/resource/OaData'

export function transformCombining(dataList: OaData[][], transformationType: TransformationType) {
  switch (transformationType.$id) {
    case 1:
      return sum(dataList)
    case 2:
      return sub(dataList)
    case 3:
      return division(dataList)
    case 4:
      return multiply(dataList)
  }
}

export function transform(dataList: OaData[], transformationType: TransformationType) {
  switch (transformationType.$id) {
    case 5:
      return differential(dataList)
    case 6:
      return log(dataList)
    case 7:
      return exponential(dataList)
    case 8:
      return periodOverPeriodVariation(dataList)
    case 9:
      return monthSpaceVariation(dataList, 3)
    case 10:
      return monthSpaceVariation(dataList, 12)
    case 11:
      return avgTotal(dataList)
    case 12:
      return medianTotal(dataList)
    case 13:
      return max(dataList)
    case 14:
      return min(dataList)
    case 15:
      return standardDeviation(dataList)
    case 16:
      return mode(dataList)
    case 17:
      return movingAvg(dataList, 2)
    case 18:
      return movingAvg(dataList, 3)
    case 19:
      return movingAvg(dataList, 4)
    case 20:
      return movingAvg(dataList, 6)
    case 21:
      return movingAvg(dataList, 12)
    case 22:
      return movingAvg(dataList, 24)
    case 23:
      return cagr(dataList, 12)
    case 24:
      return cagr(dataList, 24)
    default:
      return dataList
  }
}

export function sum(dataLists: OaData[][]): OaData[] {
  if (!dataLists.length) {
    return []
  }

  return dataLists[0].map(di => {
    const data = new OaData(di.dt)
    data.value = dataLists.reduce((sum, dataL) => {
      const found = dataL.find(dj => di.dt === dj.dt)
      return sum + (found && found.value ? found.value : 0)
    }, 0)
    return data
  })
}

export function sub(dataLists: OaData[][]) {
  if (!dataLists.length) {
    return []
  }

  return dataLists[0].map(di => {
    const data = new OaData(di.dt)
    data.value = dataLists.reduce((sub, dataL) => {
      const found = dataL.find(dj => di.dt === dj.dt)
      return sub - (found && found.value ? found.value : 0)
    }, 0)
    return data
  })
}

export function division(dataLists: OaData[][]) {
  if (!dataLists.length) {
    return []
  }

  return dataLists[0].map(di => {
    const data = new OaData(di.dt)
    data.value = dataLists.reduce((division, dataL) => {
      const found = dataL.find(dj => di.dt === dj.dt)
      return division / (found && found.value ? found.value : 0)
    }, 0)
    return data
  })
}

export function multiply(dataLists: OaData[][]) {
  if (!dataLists.length) {
    return []
  }

  return dataLists[0].map(di => {
    const data = new OaData(di.dt)
    data.value = dataLists.reduce((multiplication, dataL) => {
      const found = dataL.find(dj => di.dt === dj.dt)
      return multiplication * (found && found.value ? found.value : 0)
    }, 0)
    return data
  })
}

export function differential(dataList: OaData[]) {
  return dataList.map((d, i) => {
    const data = new OaData(d.dt)

    if (i > 0) {
      data.value = (d.value || 0) - (dataList[i - 1].value || 0)
    }

    return data
  })
}

export function log(dataList: OaData[]) {
  return dataList.map(d => new OaData(d.dt, d.value ? Math.log(d.value) : null))
}

export function exponential(dataList: OaData[]) {
  return dataList.map(d => new OaData(d.dt, d.value ? Math.exp(d.value) : null))
}

export function periodOverPeriodVariation(dataList: OaData[]) {
  return dataList.map((d, i) => {
    const data = new OaData(d.dt)

    if (i > 0 && d.value != null) {
      const d2val = dataList[i - 1].value
      if (d2val != null) {
        data.value = d.value / d2val - 1
      }
    }

    return data
  })
}

export function monthSpaceVariation(dataList: OaData[], months: number) {
  return dataList.map((di, i) => {
    const data = new OaData(di.dt)
    const diMoment = moment(di.dt)

    for (let j = i - 1; j >= 0; j--) {
      const dj = dataList[j]

      const djMoment = moment(dj.dt)

      if (diMoment.diff(djMoment, 'month') === months) {
        if (di.value != null && dj.value != null) {
          data.value = di.value / dj.value - 1
        }
        break
      }
    }

    return data
  })
}

export function avgTotal(dataList: OaData[]) {
  const dataListNotNull = dataList.filter(d => d.value != null)

  const finalUniqueValue = dataListNotNull.reduce((a, b) => a + (b.value || 0), 0) / dataListNotNull.length

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function medianTotal(dataList: OaData[]) {
  if (!dataList.length) {
    return dataList
  }

  const orderedValues = dataList
    .filter(d => d.value != null)
    .map(d => d.value || 0)
    .sort((a, b) => a - b)

  const mid = orderedValues.length / 2

  const finalUniqueValue = mid % 1 ? orderedValues[mid - 0.5] : (orderedValues[mid - 1] + orderedValues[mid]) / 2

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function max(dataList: OaData[]) {
  const finalUniqueValue = dataList.reduce((a, b) => Math.max(a, b.value || Number.MIN_SAFE_INTEGER), 0)

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function min(dataList: OaData[]) {
  const finalUniqueValue = dataList.reduce((a, b) => Math.min(a, b.value || Number.MAX_SAFE_INTEGER), 0)

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function standardDeviation(dataList: OaData[]) {
  const dataListNotNull = dataList.filter(d => d.value != null)

  const avg = dataListNotNull.reduce((a, b) => a + (b.value || 0), 0) / dataListNotNull.length

  const squareDiffs = dataListNotNull.map(d => {
    const diff = (d.value || 0) - avg
    return diff * diff
  })

  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length

  const finalUniqueValue = Math.sqrt(avgSquareDiff)

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function mode(dataList: OaData[]) {
  const finalUniqueValue = dataList
    .filter(d => d.value != null)
    .map(d => d.value)
    .sort((a, b) => {
      const countEqualToA = dataList.filter(d => d.value === a).length
      const countEqualToB = dataList.filter(d => d.value === b).length

      return countEqualToA - countEqualToB
    })
    .pop()

  return dataList.map(d => new OaData(d.dt, finalUniqueValue))
}

export function movingAvg(dataList: OaData[], periods: number) {
  return dataList.map((d, i) => {
    const data = new OaData(d.dt)

    if (i >= periods - 1) {
      data.value = dataList.slice(i - (periods - 1), i + 1).reduce<number>((a, b) => a + (b.value || 0), 0) / periods
    }

    return data
  })
}

export function cagr(dataList: OaData[], periods: number) {
  return dataList.map((d, i) => {
    const data = new OaData(d.dt)

    if (i >= periods) {
      data.value = Math.pow((d.value || 0) / (dataList[i - (periods - 1)].value || 0), 1 / 11) - 1
    }

    return data
  })
}
