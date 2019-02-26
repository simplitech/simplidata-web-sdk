/**
 * User
 * @author Simpli CLI generator
 */
import { $, encrypt, ID, Resource, HttpBody, TAG, Resp } from '../../simpli'
import {
  ResponseHidden,
  ResponseSerialize,
  ValidationEmail,
  ValidationMaxLength,
  ValidationPasswordLength,
  ValidationRequired,
} from '../../simpli'
import { Address } from './Address'
import { PagarmeSubscription } from '../pagarme/PagarmeSubscription'
import { PagarmeCard } from '../pagarme/PagarmeCard'
import { SubscriptionRequest } from '../request/SubscriptionRequest'
import { SubscriptionResponse } from '../response/SubscriptionResponse'
import UserSchema from '../../schemas/User.schema'

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

  @ResponseSerialize(PagarmeSubscription)
  pagarmeSubscription: PagarmeSubscription = new PagarmeSubscription()

  @ResponseSerialize(PagarmeCard)
  pagarmeCard: PagarmeCard = new PagarmeCard()

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

  async persistSubscriptionWithValidation(request: SubscriptionRequest): Promise<Resp<SubscriptionResponse>> {
    const fetch = async () => {
      if (request.card) {
        await request.card.customer.validate()
        await request.card.customer.phone.validate()
        await request.card.validate()
        await request.card.customer.address.validate()
      }

      return await new HttpBody(SubscriptionResponse).POST(`/User/Subscription`, request)
    }
    return await $.await.run(fetch, 'persistSubscription')
  }

  async persistSubscription(request: SubscriptionRequest): Promise<Resp<SubscriptionResponse>> {
    const fetch = async () => {
      return await new HttpBody(SubscriptionResponse).POST(`/User/Subscription`, request)
    }
    return await $.await.run(fetch, 'persistSubscription')
  }

  async cancelSubscription(password: string) {
    const body = encrypt(password)

    const fetch = async () => {
      return await this.DELETE(`/User/Subscription`, { body })
    }
    return await $.await.run(fetch, 'cancelSubscription')
  }
}
