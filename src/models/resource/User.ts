/**
 * User
 * @author Simpli© CLI generator
 */
import { ID, Resource, TAG } from 'simpli-web-sdk'
import {
  ResponseHidden,
  ResponseSerialize,
  ValidationEmail,
  ValidationMaxLength,
  ValidationPasswordLength,
  ValidationRequired,
} from 'simpli-web-sdk'
import { bool, datetime } from 'simpli-web-sdk'
import { Address } from './Address'

/* TODO: review generated class */
export class User extends Resource {
  readonly $name: string = 'User'
  readonly $endpoint: string = '/User/User{/id}'

  get $id() {
    return this.idUserPk
  }
  set $id(val: ID) {
    this.idUserPk = val
  }
  get $tag() {
    return this.name
  }
  set $tag(val: TAG) {
    this.name = val
  }

  @ResponseSerialize(Address)
  address: Address = new Address()

  idUserPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string = ''

  @ResponseHidden()
  @ValidationRequired()
  @ValidationPasswordLength(6, 100)
  password: string = ''

  @ValidationRequired()
  @ValidationMaxLength(100)
  name: string = ''

  @ValidationRequired()
  @ValidationMaxLength(7)
  primaryPhoneRegion: string = ''

  @ValidationRequired()
  @ValidationMaxLength(31)
  primaryPhoneNumber: string = ''

  @ValidationMaxLength(255)
  personalDocument: string = ''

  @ValidationMaxLength(255)
  corporateDocument: string = ''

  @ValidationMaxLength(255)
  corporateName: string = ''

  @ValidationMaxLength(255)
  tradingName: string = ''

  creationDate: string | null = null

  active: boolean | null = null

  get idAddressFk() {
    if (!this.address) return 0
    return this.address.$id
  }
  set idAddressFk(idAddressFk: ID) {
    if (!this.address) this.address = new Address()
    this.address.$id = idAddressFk
  }

  private _primaryPhone: string = ''
  get primaryPhone() {
    return this._primaryPhone
  }
  set primaryPhone(val: string) {
    const regex = /^\((\d+)\)\s?(\d{4,5})-?(\d{3,4})$/g
    const match = regex.exec(val)

    if (match) {
      this.primaryPhoneRegion = match[1] || ''
      this.primaryPhoneNumber = `${match[2] || ''}${match[3] || ''}`
    } else {
      this.primaryPhoneRegion = ''
      this.primaryPhoneNumber = ''
    }

    this._primaryPhone = val
  }

  scheme(): any {
    return {
      address: this.address && this.address.$id,
      idUserPk: this.idUserPk,
      email: this.email,
      name: this.name,
      personalDocument: this.personalDocument,
      corporateDocument: this.corporateDocument,
      corporateName: this.corporateName,
      tradingName: this.tradingName,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }

  csvScheme(): any {
    return {
      address: this.address && this.address.$id,
      idUserPk: this.idUserPk,
      email: this.email,
      name: this.name,
      personalDocument: this.personalDocument,
      corporateDocument: this.corporateDocument,
      corporateName: this.corporateName,
      tradingName: this.tradingName,
      creationDate: datetime(this.creationDate),
      active: bool(this.active),
    }
  }
}
