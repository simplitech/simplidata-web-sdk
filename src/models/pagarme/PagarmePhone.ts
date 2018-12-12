/**
 * PagarmePhone
 * @author ftgibran
 */
import { Model } from '../../simpli'
import { ValidationRequired, ValidationMaxLength, ValidationPhone } from '../../simpli'

/* tslint:disable:variable-name */
export class PagarmePhone extends Model {
  readonly $name: string = 'PagarmePhone'

  ddi: string | null = null

  @ValidationRequired()
  ddd: string | null = null

  @ValidationRequired()
  @ValidationPhone()
  number: string | null = null
}
