/**
 * OaPeriodicity
 * @author Simpli CLI generator
 */
import { ID, Resource, TAG } from '../../simpli'
import { $, ValidationMaxLength, ValidationRequired } from '../../simpli'
import OaPeriodicitySchema from '../../schemas/OaPeriodicity.schema'
import { removeAccentsAndSpace } from '../../utils'
import { OaData } from './OaData'
import moment from 'moment'

export class OaPeriodicity extends Resource {
  readonly $name: string = 'OaPeriodicity'
  readonly $endpoint: string = '/User/OaPeriodicity{/id}'

  static Daily = 1 // 'Daily',
  static Weekly = 2 // 'Weekly',
  static Biweekly = 3 // 'Biweekly',
  static Monthly = 4 // 'Monthly',
  static Bimonthly = 5 // 'Bimonthly',
  static Quarterly = 6 // 'Quarterly',
  static Quadrimesterly = 7 // 'Quadrimesterly',
  static Semiannual = 8 // 'Semiannual',
  static Yearly = 9 // 'Yearly',

  get $schema() {
    return OaPeriodicitySchema(this)
  }

  get $id() {
    return this.idOaPeriodicityPk
  }
  set $id(val: ID) {
    this.idOaPeriodicityPk = val
  }
  get $tag() {
    return $.t(`slang.${this.$name}.${removeAccentsAndSpace(this.title)}`)
  }
  set $tag(val: TAG) {
    this.title = val
  }

  idOaPeriodicityPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  title: string = ''

  @ValidationRequired()
  active: boolean = false

  get asFrequency() {
    switch (this.idOaPeriodicityPk) {
      case OaPeriodicity.Daily:
        return 365
      case OaPeriodicity.Weekly:
        return 52
      case OaPeriodicity.Biweekly:
        return 104
      case OaPeriodicity.Monthly:
        return 12
      case OaPeriodicity.Bimonthly:
        return 24
      case OaPeriodicity.Quarterly:
        return 4
      case OaPeriodicity.Quadrimesterly:
        return 3
      case OaPeriodicity.Semiannual:
        return 2
      case OaPeriodicity.Yearly:
        return 1
      default:
        return 1
    }
  }

  getPeriodDate(oaData: OaData) {
    const dtFormat: string = $.t('system.format.date').toString()
    let m = moment(oaData.dt)

    if (this.idOaPeriodicityPk === OaPeriodicity.Daily) {
      m = m.startOf('day')
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Weekly) {
      m = m.startOf('week')
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Biweekly) {
      m = m.startOf('week') // TODO: corrigir Biweekly
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Monthly) {
      m = m.startOf('month')
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Bimonthly) {
      m = m.startOf('month')
      // 1, 3, 5... -> 0, 2, 4... - january is 0
      if (m.month() % 2 !== 0) {
        m.subtract(1, 'month')
      }
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Quarterly) {
      m = m.startOf('month')
      // 1, 4, 7, 10 -> 0, 3, 6, 9 - january is 0
      while (m.month() % 3 !== 0) {
        m.subtract(1, 'month')
      }
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Quadrimesterly) {
      m = m.startOf('month')
      // 1, 5, 9 -> 0, 4, 8 - january is 0
      while (m.month() % 4 !== 0) {
        m.subtract(1, 'month')
      }
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Semiannual) {
      m = m.startOf('month')
      // 1, 7 -> 0, 6 - january is 0
      while (m.month() % 6 !== 0) {
        m.subtract(1, 'month')
      }
    } else if (this.idOaPeriodicityPk === OaPeriodicity.Yearly) {
      m = m.startOf('year')
    }

    return m.format(dtFormat)
  }
}
