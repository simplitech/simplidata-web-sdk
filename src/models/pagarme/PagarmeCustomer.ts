/**
 * PagarmeCustomer
 * @author ftgibran
 */
import { $, Model, IResource, ObjectCollection } from '../../simpli'
import {
  ResponseSerialize,
  ValidationRequired,
  ValidationEmail,
  ValidationMaxLength,
  ValidationPasswordLength,
} from '../../simpli'
import { DocumentType } from '../../enums/DocumentType'
import { PagarmePhone } from './PagarmePhone'
import { PagarmeAddress } from './PagarmeAddress'

/* tslint:disable:variable-name */
export class PagarmeCustomer extends Model {
  readonly $name: string = 'PagarmeCustomer'

  id: string | null = null

  type: DocumentType | null = null

  @ValidationRequired()
  name: string | null = null

  @ValidationRequired()
  @ValidationEmail()
  email: string | null = null

  @ValidationRequired()
  document_number: string | null = null

  document_type: string | null = null

  @ValidationRequired()
  sex: string | null = null

  born_at_format: object | null = null

  external_id: string | null = null

  country: string | null = null

  @ResponseSerialize(PagarmePhone)
  phone: PagarmePhone = new PagarmePhone()

  @ResponseSerialize(PagarmeAddress)
  address: PagarmeAddress = new PagarmeAddress()

  get sexResource() {
    return this.sexCollection.get(this.sex)
  }

  set sexResource(val: IResource | null) {
    this.sex = (val && (val.$id as string)) || null
  }

  get sexCollection() {
    const items = [
      { $id: $.t('gender.male'), $tag: $.t('gender.male') },
      { $id: $.t('gender.female'), $tag: $.t('gender.female') },
      { $id: $.t('gender.other'), $tag: $.t('gender.other') },
      { $id: $.t('gender.doNotInform'), $tag: $.t('gender.doNotInform') },
    ]
    return new ObjectCollection(items)
  }
}
