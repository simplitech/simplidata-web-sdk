/**
 * PagarmeSubscription
 * @author ftgibran
 */
import { Model } from '../../simpli'
import { ResponseSerialize, ValidationRequired } from '../../simpli'
import { PaymentMethod } from '../../enums/PaymentMethod'
import { SubscriptionStatus } from '../../enums/SubscriptionStatus'
import { PagarmePlan } from './PagarmePlan'
import { PagarmeCustomer } from './PagarmeCustomer'
import { PagarmePhone } from './PagarmePhone'
import { PagarmeAddress } from './PagarmeAddress'

/* tslint:disable:variable-name */
export class PagarmeSubscription extends Model {
  id: string | null = null

  status: SubscriptionStatus | null = null

  charges: number | null = null

  currentPeriodStart: string | null = null

  currentPeriodEnd: string | null = null

  @ValidationRequired()
  paymentMethod: PaymentMethod | null = null

  @ResponseSerialize(PagarmePlan)
  plan: PagarmePlan = new PagarmePlan()

  @ResponseSerialize(PagarmeCustomer)
  customer: PagarmeCustomer = new PagarmeCustomer()
}
