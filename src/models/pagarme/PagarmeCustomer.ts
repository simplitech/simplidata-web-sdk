/**
 * PagarmeCustomer
 * @author ftgibran
 */
import { $, Model, ResourceObject } from '../../simpli'
import { ResponseSerialize, ValidationRequired, ValidationMaxLength, ValidationPasswordLength } from '../../simpli'
import { DocumentType } from '../../enums/DocumentType'
import { PagarmePhone } from './PagarmePhone'
import { PagarmeAddress } from './PagarmeAddress'

/* tslint:disable:variable-name */
export class PagarmeCustomer extends Model {
  id: string | null = null

  type: DocumentType | null = null

  @ValidationRequired()
  @ValidationMaxLength(255)
  name: string | null = null

  @ValidationRequired()
  @ValidationMaxLength(255)
  email: string | null = null

  @ValidationRequired()
  @ValidationMaxLength(127)
  document_number: string | null = null

  document_type: string | null = null

  sex: string | null = null

  born_at_format: object | null = null

  external_id: string | null = null

  country: string | null = null

  @ResponseSerialize(PagarmePhone)
  phone: PagarmePhone = new PagarmePhone()

  @ResponseSerialize(PagarmeAddress)
  address: PagarmeAddress = new PagarmeAddress()

  get sexSelected() {
    return this.sexOptions.find((obj: any) => obj.$tag === this.sex) || {}
  }

  set sexSelected(val: ResourceObject) {
    this.sex = val.$tag || null
  }

  get sexOptions(): ResourceObject[] {
    return [
      {},
      { $id: 0, $tag: $.t('gender.male') },
      { $id: 1, $tag: $.t('gender.female') },
      { $id: 2, $tag: $.t('gender.other') },
      { $id: 3, $tag: $.t('gender.doNotInform') },
    ]
  }
}