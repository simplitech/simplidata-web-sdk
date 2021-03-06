/**
 * PagarmeCard
 * @author ftgibran
 */
import moment from 'moment'
import { Model, IResource, ObjectCollection } from '../../simpli'
import { ValidationRequired, ResponseSerialize } from '../../simpli'
import { CardBrand } from '../../enums/CardBrand'
import { PagarmeCustomer } from './PagarmeCustomer'

const YEAR_RANGE = 30

/* tslint:disable:variable-name */
export class PagarmeCard extends Model {
  readonly $name: string = 'PagarmeCard'

  id: string | null = null

  @ResponseSerialize(PagarmeCustomer)
  customer: PagarmeCustomer = new PagarmeCustomer()

  first_digits: string | null = null

  last_digits: string | null = null

  @ValidationRequired()
  holder_name: string | null = null

  @ValidationRequired()
  card_number: string | null = null

  @ValidationRequired()
  cvv: string | null = null

  @ValidationRequired()
  card_expiration_date: string | null = null

  date_updated: string | null = null

  brand: CardBrand | null = null

  country: string | null = null

  fingerprint: string | null = null

  valid: boolean | null = null

  get cardNumber() {
    const { card_number } = this

    if (card_number) {
      const parts = [
        card_number.slice(0, 4),
        card_number.slice(4, 8),
        card_number.slice(8, 12),
        card_number.slice(12, 16),
      ]
      return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`
    }

    return ''
  }

  set cardNumber(val: string) {
    this.card_number = val && val.replace(/ /g, '')
  }

  get expirationMonth(): IResource | null {
    const str = this.card_expiration_date || '    '
    const mm = Number(str.slice(0, 2).trim()) || null

    if (mm) {
      return {
        $id: mm,
        $tag: mm.toString(),
      }
    }

    return null
  }

  set expirationMonth(obj: IResource | null) {
    const mm = obj && obj.$id
    const str = this.card_expiration_date || '    '

    const month = mm ? moment(mm, 'MM').format('MM') : '  '
    const year = str.slice(-2)

    this.card_expiration_date = `${month}${year}`
  }

  get expirationYear(): IResource | null {
    const str = this.card_expiration_date || '    '
    const yy = Number(str.slice(-2).trim()) || null
    const yyyy = (yy && Number(moment(yy, 'YY').format('YYYY'))) || null

    if (yyyy) {
      return {
        $id: yyyy,
        $tag: yyyy.toString(),
      }
    }

    return null
  }

  set expirationYear(obj: IResource | null) {
    const yyyy = obj && obj.$id
    const str = this.card_expiration_date || '    '

    const month = str.slice(0, 2)
    const year = yyyy ? moment(yyyy, 'YYYY').format('YY') : '  '

    this.card_expiration_date = `${month}${year}`
  }

  get monthCollection() {
    const months: IResource[] = []

    for (let i = 0; i <= 11; i++) {
      months.push({
        $id: i + 1,
        $tag: moment()
          .month(i)
          .format('MMMM'),
      })
    }

    return new ObjectCollection(months)
  }

  get yearCollection() {
    const years: number[] = []
    let currentYear = moment().year()

    for (let i = 0; i < YEAR_RANGE; i++) {
      years.push(currentYear++)
    }

    const items = years.map((year: number) => ({
      $id: year,
      $tag: `${year}`,
    }))

    return new ObjectCollection(items)
  }

  getBrand() {
    const card_number = this.card_number || ''

    const regexVisa = /^4[0-9]{12}(?:[0-9]{3})?/
    const regexMaster = /^5[1-5][0-9]{14}/
    const regexAmex = /^3[47][0-9]{13}/
    const regexDiners = /^3(?:0[0-5]|[68][0-9])[0-9]{11}/
    const regexDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}/
    const regexJCB = /^(?:2131|1800|35\d{3})\d{11}/

    if (regexVisa.test(card_number)) return CardBrand.VISA
    if (regexMaster.test(card_number)) return CardBrand.MASTERCARD
    if (regexAmex.test(card_number)) return CardBrand.AMEX
    if (regexDiners.test(card_number)) return CardBrand.DISCOVER
    if (regexDiscover.test(card_number)) return CardBrand.DISCOVER
    if (regexJCB.test(card_number)) return CardBrand.JCB

    return null
  }
}
