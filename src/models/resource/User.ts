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
import { Address } from './Address'
import UserSchema from '../../schemas/User.schema'

/* TODO: review generated class */
export class User extends Resource {
  static $placeholder: string = 'img/placeholder/avatar.png'

  readonly $name: string = 'User'
  readonly $endpoint: string = '/User/User{/id}'

  get $schema() {
    return UserSchema(this)
  }

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

  get $avatar() {
    return this.urlAvatar || User.$placeholder
  }

  @ResponseSerialize(Address)
  address: Address = new Address()

  idUserPk: ID = 0

  @ValidationRequired()
  @ValidationMaxLength(100)
  @ValidationEmail()
  email: string = ''

  @ResponseHidden()
  password: string = ''

  @ValidationRequired()
  @ValidationMaxLength(100)
  name: string = ''

  urlAvatar: string | null = null

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

  get primaryPhone() {
    return `${this.primaryPhoneRegion}${this.primaryPhoneNumber}`
  }
  set primaryPhone(val: string) {
    const regex = /^\((\d+)\)\s?(\d{0,5})-?(\d{0,4})$/g
    const match = regex.exec(val)

    if (match) {
      this.primaryPhoneRegion = match[1] || ''
      this.primaryPhoneNumber = `${match[2] || ''}${match[3] || ''}`
    } else {
      this.primaryPhoneRegion = ''
      this.primaryPhoneNumber = ''
    }
  }
}
